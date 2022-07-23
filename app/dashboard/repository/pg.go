package pg

import (
	"database/sql"
	"errors"

	sq "github.com/Masterminds/squirrel"
	"ucrm/app/models"
	"github.com/ignavan39/go-pkgs/pg/v1"
)

type Repository struct {
	pool pg.Pool
}

func NewRepository(pool pg.Pool) *Repository {
	return &Repository{
		pool: pool,
	}
}

func (r *Repository) Create(name string, userId string) (*models.Dashboard, error) {
	dashboard := &models.Dashboard{}

	row := sq.Insert("dashboards").
		Columns("name", "author_id").
		Values(name, userId).
		Suffix("returning id,name,author_id,updated_at").
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&dashboard.Id, &dashboard.Name, &dashboard.AuthorId, &dashboard.UpdatedAt); err != nil {
		return nil, err
	}

	return dashboard, nil
}

func (r *Repository) GetOneInternal(dashboardId string) (*models.Dashboard, error) {
	var dashboard models.Dashboard

	rows, err := sq.Select("d.name", "d.author_id", "d.id", "d.updated_at", "du.user_id", "du.access").
		From("dashboards d").
		LeftJoin("dashboards_user du on d.id = du.dashboard_id").
		Where(sq.Eq{"d.id": dashboardId}).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		Query()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	defer rows.Close()

	dashboardUsers := []models.DashboardsUsers{}
	for rows.Next() {
		var da models.DashboardsUsers
		if err := rows.Scan(&dashboard.Name, &dashboard.AuthorId, &dashboard.Id, &dashboard.UpdatedAt, &da.UserId, &da.Access); err != nil {
			return nil, err
		}
		dashboardUsers = append(dashboardUsers, da)
	}
	dashboard.Users = dashboardUsers

	return &dashboard, nil
}

func (r *Repository) GetOne(dashboardId string) (*models.Dashboard, error) {
	var dashboard models.Dashboard

	rows, err := sq.Select("d.*",
		"f.id", "f.name", "f.type", "f.is_nullable",
		"p.id", "p.name", `p."order"`,
		"c.id", "c.name", `c."order"`, "c.pipeline_id").
		From("dashboards d").
		LeftJoin("pipelines p on d.id = p.dashboard_id").
		LeftJoin("cards c on c.pipeline_id = p.id").
		LeftJoin("fields f on f.dashboard_id = d.id").
		Where(sq.Eq{"d.id": dashboardId}).
		OrderBy(`p."order"`, `c."order"`).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		Query()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	defer rows.Close()

	idToFields := make(map[string]models.Field)
	idToPipelines := make(map[string]*models.Pipeline)

	var pipelineRow PipelineRow
	var cardRow CardRow
	var fieldRow FieldRow
	var tempPipeline *models.Pipeline

	for rows.Next() {
		if err := rows.Scan(
			&dashboard.Id,
			&dashboard.UpdatedAt,
			&dashboard.Name,
			&dashboard.AuthorId,
			&fieldRow.Id,
			&fieldRow.Name,
			&fieldRow.Type,
			&fieldRow.IsNullable,
			&pipelineRow.Id,
			&pipelineRow.Name,
			&pipelineRow.Order,
			&cardRow.Id,
			&cardRow.Name,
			&cardRow.Order,
			&cardRow.PipelineId,
		); err != nil {
			return nil, err
		}

		if fieldRow.Id.Valid {
			id := fieldRow.Id.String
			_, found := idToFields[id]

			if !found {
				field := models.Field{
					Id:         id,
					IsNullable: fieldRow.IsNullable.Bool,
					Name:       fieldRow.Name.String,
					Type:       fieldRow.Type.String,
				}
				idToFields[id] = field
			}
		}

		if pipelineRow.Id.Valid {
			id := pipelineRow.Id.String
			_, found := idToPipelines[id]

			if !found {
				pipeline := models.Pipeline{
					Id:    id,
					Name:  pipelineRow.Name.String,
					Order: int(pipelineRow.Order.Int64),
				}
				idToPipelines[id] = &pipeline
				tempPipeline = &pipeline
			}
		}

		if cardRow.Id.Valid {
			if len((*tempPipeline).Cards) == 0 {
				(*tempPipeline).Cards = make([]models.Card, 0)
			}

			card := models.Card{
				Id:         cardRow.Id.String,
				Name:       cardRow.Name.String,
				PipelineId: cardRow.PipelineId.String,
				Order:      int(cardRow.Order.Int64),
			}

			(*tempPipeline).Cards = append((*tempPipeline).Cards, card)
		}
	}

	dashboard.Fields = make([]models.Field, 0)
	dashboard.Pipelines = make([]models.Pipeline, 0)

	for _, p := range idToPipelines {
		dashboard.Pipelines = append(dashboard.Pipelines, *p)
	}

	for _, f := range idToFields {
		dashboard.Fields = append(dashboard.Fields, f)
	}

	return &dashboard, nil
}

var AdminAccess = []string{"rw", "r", "admin"}
var RWAccess = []string{"rw", "r"}

func (r *Repository) GetOneWithUserAccess(dashboardId string, userId string, accessType string) (*models.Dashboard, error) {
	var dashboard models.Dashboard

	builder := sq.Select("d.name", "d.author_id", "d.id", "d.updated_at", "du.user_id", "du.access").
		From("dashboards d").
		LeftJoin("dashboards_user du on d.id = du.dashboard_id").
		Where(sq.Eq{"d.id": dashboardId, "du.user_id": userId})
	if accessType == "admin" {
		builder.Where(sq.Eq{"du.access": AdminAccess})
	} else if accessType == "rw" {
		builder.Where(sq.Eq{"du.access": RWAccess})
	} else {
		builder.Where(sq.Eq{"du.access": accessType})
	}

	rows, err := builder.
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		Query()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	defer rows.Close()

	dashboardUsers := []models.DashboardsUsers{}
	for rows.Next() {
		var da models.DashboardsUsers
		if err := rows.Scan(&dashboard.Name, &dashboard.AuthorId, &dashboard.Id, &dashboard.UpdatedAt, &da.UserId, &da.Access); err != nil {
			return nil, err
		}
		dashboardUsers = append(dashboardUsers, da)
	}
	dashboard.Users = dashboardUsers

	return &dashboard, nil
}

func (r *Repository) AddAccess(dashboardId string, userId string, access string) error {
	_, err := sq.Insert("dashboards_user").Columns("user_id", "dashboard_id", "access").
		Values(userId, dashboardId, access).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) UpdateName(dashboardId string, name string) error {
	_, err := sq.Update("dashboards").
		Set("name", name).
		Where(sq.Eq{"id": dashboardId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) DeleteById(dashboardId string) error {
	_, err := sq.Delete("dashboards cascade").
		Where(sq.Eq{"id": dashboardId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil
		}
		return err
	}

	return nil
}

func (r *Repository) AddSettings(dashboardId string, secret string, xClientToken string) (*models.DashboardSettings, error) {
	var res models.DashboardSettings

	row := sq.Insert("dashboard_settings").
		Columns("dashboard_id", "client_token", "secret").
		Values(dashboardId, xClientToken, secret).
		Suffix("on conflict (dashboard_id) do update set client_token = ?, secret = ? returning id,dashboard_id,client_token,secret", xClientToken, secret).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&res.Id, &res.DashboardId, &res.ClientToken, &res.Secret); err != nil {
		return nil, err
	}

	return &res, nil
}

func (r *Repository) GetSettings(xClientToken string) (*models.DashboardSettings, error) {
	var res models.DashboardSettings

	row := sq.Select("dashboard_id", "client_token", "secret", "id").
		From("dashboard_settings").
		Where(sq.Eq{"client_token": xClientToken}).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&res.DashboardId, &res.ClientToken, &res.Secret, &res.Id); err != nil {
		return nil, err
	}

	return &res, nil
}

func (r *Repository) AddCustomField(dashboardId string, name string, isNullable bool, fieldType string) (*models.Field, error) {
	field := &models.Field{}

	row := sq.Insert("fields").
		Columns("name", "dashboard_id", "is_nullable", "type").
		Values(name, dashboardId, isNullable, fieldType).
		Suffix(`returning id, name, dashboard_id, is_nullable, type`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()

	if err := row.Scan(&field.Id, &field.Name, &field.DashboardId, &field.IsNullable, &field.Type); err != nil {
		return nil, err
	}

	return field, nil
}

func (r *Repository) DeleteCustomField(fieldId string) error {
	_, err := sq.Delete("fields").
		Where(sq.Eq{"id": fieldId}).
		PlaceholderFormat(sq.Dollar).
		RunWith(r.pool.Write()).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (d *Repository) UpdateAccess(dashboardId string, userId string, access string) error {
	_, err := sq.Update("dashboards_user").
		Set("access", access).
		Where(sq.And{sq.Eq{"dashboard_id": dashboardId}, sq.Eq{"user_id": userId}}).
		RunWith(d.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) RemoveAccess(dashboardId string, userId string) error {
	_, err := sq.Delete("dashboards_user").
		Where(sq.And{sq.Eq{"dashboard_id": dashboardId}, sq.Eq{"user_id": userId}}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetOneByUser(userId string) ([]models.Dashboard, error) {
	dashboards := make([]models.Dashboard, 0)

	rows, err := sq.Select("d.name", "d.author_id", "d.id", "d.updated_at").
		From("dashboards d").
		LeftJoin("dashboards_user du on d.id = du.dashboard_id").
		Where(sq.Eq{"du.user_id": userId}).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		Query()

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return dashboards, nil
		}
		return dashboards, err
	}

	defer rows.Close()
	for rows.Next() {
		var dashboard models.Dashboard
		if err := rows.Scan(
			&dashboard.Name,
			&dashboard.AuthorId,
			&dashboard.Id,
			&dashboard.UpdatedAt,
		); err != nil {
			return dashboards, err
		}

		dashboards = append(dashboards, dashboard)
	}

	return dashboards, nil
}

func (r *Repository) GetDashboardIdByFieldId(fieldId string) (*string, error) {
	row := sq.Select("dashboard_id").
		From("fields").
		Where(sq.Eq{"id": fieldId}).
		PlaceholderFormat(sq.Dollar).
		RunWith(r.pool.Read()).
		QueryRow()

	var dashboardId string
	if err := row.Scan(&dashboardId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return &dashboardId, nil
}
