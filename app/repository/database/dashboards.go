package database

import (
	"database/sql"
	"errors"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) AddDashboard(name string, userId string) (*models.Dashboard, error) {
	dashboard := &models.Dashboard{}
	row := sq.Insert("dashboards").Columns("name", "author_id").
		Values(name, userId).
		Suffix("returning id,name,author_id,updated_at").
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&dashboard.Id, &dashboard.Name, &dashboard.AuthorId, &dashboard.UpdatedAt); err != nil {
		return nil, err
	}
	_, err := sq.Insert("dashboards_user").Columns("dashboard_id", "user_id", "access").
		Values(dashboard.Id, userId, "rw").
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return nil, err
	}
	return dashboard, nil
}

func (r *DbService) GetOneDashboard(dashboardId string) (*models.Dashboard, error) {
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

func (r *DbService) GetOneDashboardWithUserAccess(dashboardId string, userId string, accessType string) (*models.Dashboard, error) {
	var dashboard models.Dashboard

	builder := sq.Select("d.name", "d.author_id", "d.id", "d.updated_at", "du.user_id", "du.access").
		From("dashboards d").
		LeftJoin("dashboards_user du on d.id = du.dashboard_id").
		Where(sq.Eq{"d.id": dashboardId, "du.user_id": userId})
	if accessType == "r" {
		builder.Where(sq.Or{sq.Eq{"du.access": accessType}, sq.Eq{"du.access": "rw"}})
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

func (r *DbService) AddUserToDashboard(dashboardId string, userId string, access string) (*string, error) {
	var id *string
	row := sq.Insert("dashboards_user").Columns("user_id", "dashboard_id", "access").
		Values(userId, dashboardId, access).
		Suffix("returning id").
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&id); err != nil {
		return nil, err
	}

	return id, nil
}

func (r *DbService) UpdateDashboardName(dashboardId string, name string) error {
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

func (r *DbService) DeleteDashboardById(dashboardId string) error {
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

func (r *DbService) AddDashboardSettings(dashboardId string, secret string, xClientToken string) (*models.DashboardSettings, error) {
	var res models.DashboardSettings

	row := sq.Insert("dashboard_settings").Columns("dashboard_id", "client_token", "secret").
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

func (r *DbService) GetDashboardSettings(xClientToken string) (*models.DashboardSettings, error) {
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

func (r *DbService) AddCustomField(dashboardId string, name string, isNullable bool, fieldType string) (*models.Field, error) {
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

	var idColumnName string
	var completeSql string
	var tableForInsert string

	if fieldType == "card" {
		idColumnName = "card_id"
		tableForInsert = "card_fields"

		selectQuery, _, err := sq.Select("id").
			From("pipelines").
			Where("dashboard_id = ?").
			PlaceholderFormat(sq.Dollar).
			ToSql()
		if err != nil {
			return nil, err
		}
		
		completeSql = fmt.Sprintf("with p as (%s) select id from cards where pipeline_id in (select * from p)", selectQuery)
	} else if fieldType == "contact" {
		idColumnName = "contact_id"
		tableForInsert = "contact_fields"
		var err error
	
		completeSql, _, err = sq.Select("id").
			From("contacts").
			Where("dashboard_id = ?").
			PlaceholderFormat(sq.Dollar).
			ToSql()
		if err != nil {
			return nil, err
		}
	}

	var fieldIds []string

	rows, err := r.pool.Read().
		Query(completeSql, dashboardId)
	if err != nil {
		if !(errors.Is(err, sql.ErrNoRows)) {
			return nil, err
		}
	}
	defer rows.Close()

	if len (fieldIds) != 0 {
		for rows.Next() {
			var id string
			if err := rows.Scan(&id); err != nil {
				return nil, err
			}
			fieldIds = append(fieldIds, id)
		}

		qb := sq.Insert(tableForInsert).
			Columns(idColumnName, "field_id", "value")

		for _, id := range fieldIds {
			qb = qb.Values(id, field.Id, nil)
		}

		_, err = qb.
			PlaceholderFormat(sq.Dollar).
			RunWith(r.pool.Write()).
			Exec()
		if err != nil {
			return nil, err
		}
	}

	return field, nil
}
