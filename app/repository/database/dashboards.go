package database

import (
	"database/sql"
	"errors"

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
	var dashboard *models.Dashboard

	rows, err := sq.Select("*").
		From("dashboards d").
		LeftJoin("dashboards_user du on d.id = du.dashboard_id").
		LeftJoin("left join pipelines p on d.id = p.dashboard_id").
		LeftJoin("left join cards c on p.id = c.pipeline_id").
		LeftJoin("left join contacts c2 on c.id = c2.card_id").
		LeftJoin("left join card_fields cf on c.id = cf.card_id").
		LeftJoin("left join contact_fields cf2 on c2.id = cf2.contact_id").
		LeftJoin("left join fields f on d.id = f.dashboard_id").
		Where(sq.Eq{"id": dashboardId}).
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
	return dashboard, nil
}

func (r *DbService) AddUserToDashboard(dashboardId string, userId string, access string) (*string, error) {
	var id *string
	row := sq.Insert("dashboards_user").Columns("user_id", "dashboard_id", "access").
		Values(userId, dashboardId, access).
		Suffix("returning id").
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&id); err != nil {
		return nil, err
	}
	return id, nil
}
