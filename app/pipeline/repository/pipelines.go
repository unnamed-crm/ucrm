package pg

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/pkg/pg"
)

type Repository struct {
	pool pg.Pool
}

func NewRepository(pool pg.Pool) *Repository {
	return &Repository{
		pool: pool,
	}
}

func (r *Repository) Create(name string, dashboardId string) (*models.Pipeline, error) {
	pipeline := &models.Pipeline{}
	var orderRow sql.NullInt32
	order := 1

	row := sq.Select(`max("order")`).
		From("pipeline").
		Where(sq.Eq{"dashboard_id": dashboardId}).
		PlaceholderFormat(sq.Dollar).
		RunWith(r.pool.Read()).
		QueryRow()

	if err := row.Scan(&orderRow); err != nil {
		return nil, err
	}

	if orderRow.Valid {
		order = int(orderRow.Int32) + 1
	}

	row = sq.Insert("pipelines").Columns("name", "dashboard_id", `"order"`).
		Values(name, dashboardId, order).
		Suffix(`returning id, name, "order", dashboard_id, updated_at`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&pipeline.Id, &pipeline.Name, &pipeline.Order, &pipeline.DashboardId, &pipeline.UpdatedAt); err != nil {
		return nil, err
	}

	return pipeline, nil
}

func (r *Repository) GetOne(pipelineId string) (*models.Pipeline, error) {
	pipeline := &models.Pipeline{}

	row := sq.Select("id", "name", `"order"`, "dashboard_id", "updated_at").
		From("pipelines").
		Where(sq.Eq{"id": pipelineId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&pipeline.Id, &pipeline.Name, &pipeline.Order, &pipeline.DashboardId, &pipeline.UpdatedAt); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	return pipeline, nil
}

func (r *Repository) GetAccessById(pipelineId string, userId string, accessType string) (bool, error) {
	var id string

	builder := sq.Select("p.id").
		From("pipelines p").
		Where(sq.Eq{"p.id": pipelineId}).
		InnerJoin("dashboards d on p.dashboard_id = d.id").
		InnerJoin("dashboards_user du on d.id = du.dashboard_id").
		Where(sq.Eq{"p.id": pipelineId, "du.user_id": userId})
	if accessType == "r" {
		builder.Where(sq.Or{sq.Eq{"du.access": accessType}, sq.Eq{"du.access": "rw"}})
	} else {
		builder.Where(sq.Eq{"du.access": accessType})
	}

	row := builder.RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&id); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, nil
		}

		return false, err
	}

	return true, nil
}

func (r *Repository) GetAll(dashboardId string) ([]models.Pipeline, error) {
	pipelines := []models.Pipeline{}

	rows, err := sq.Select("id", "name", `"order"`, "dashboard_id", "updated_at").
		From("pipelines").
		Where(sq.Eq{"dashboard_id": dashboardId}).
		OrderBy(`"order"`).
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
	for rows.Next() {
		var p models.Pipeline
		if err := rows.Scan(&p.Id, &p.Name, &p.Order, &p.DashboardId, &p.UpdatedAt); err != nil {
			return nil, err
		}

		pipelines = append(pipelines, p)
	}

	return pipelines, nil
}

func (r *Repository) GetAllByPipeline(pipelineId string) ([]models.Pipeline, error) {
	pipelines := []models.Pipeline{}

	selectPipelineSql, _, err := sq.Select("dashboard_id").
		From("pipelines").
		Where("id = ?").
		PlaceholderFormat(sq.Dollar).
		ToSql()
	if err != nil {
		return nil, err
	}

	completeSql := fmt.Sprintf(`
		with d as (%s)
		select id, "order" from pipelines 
		where dashboard_id = (select d.dashboard_id from d)
	`, selectPipelineSql)

	rows, err := r.pool.Read().Query(completeSql, pipelineId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		var p models.Pipeline
		if err := rows.Scan(&p.Id, &p.Order); err != nil {
			return nil, err
		}

		pipelines = append(pipelines, p)
	}

	return pipelines, nil
}

func (r *Repository) UpdateName(pipelineId string, name string) error {
	_, err := sq.Update("pipelines").
		Set("name", name).
		Where(sq.Eq{"id": pipelineId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil
		}

		return err
	}

	return err
}

func (r *Repository) DeleteById(pipelineId string) error {
	_, err := sq.Delete("pipelines cascade").
		Where(sq.Eq{"id": pipelineId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil
		}

		return err
	}

	return err
}

func (r *Repository) UpdateOrders(pipelineIdsToNewOrder map[string]int) error {
	queryArgs := make([]interface{}, 0)
	valuesForUpdate := make([]string, 0)
	argIndex := 1

	for id, order := range pipelineIdsToNewOrder {
		valuesForUpdate = append(
			valuesForUpdate, fmt.Sprintf(`($%d::uuid, %d)`, argIndex, order),
		)
		queryArgs = append(queryArgs, id)
		argIndex++
	}

	sql := fmt.Sprintf(`
		update pipelines
		set "order" = tmp.new_order
		from ( values
			%s
		) as tmp(id, new_order)
		where cards.id = tmp.id
	`, strings.Join(valuesForUpdate, ","),
	)

	_, err := r.pool.Write().Exec(sql, queryArgs...)
	if err != nil {
		return err
	}

	return nil
}
