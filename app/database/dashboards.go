package database

import (
	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/tm-go/app/models"
)

func (r *DbService) AddDashboard(name string, userId string) (*models.Dashboard, error) {
	dashboard := &models.Dashboard{}
	row := sq.Insert("dashboards").Columns("name", "author_id").
		Values(name, userId).
		Suffix("returning id,name,author_id,updated_at").
		RunWith(r.conn).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&dashboard.Id, &dashboard.Name, &dashboard.AuthorId, &dashboard.UpdatedAt); err != nil {
		return nil, err
	}
	return dashboard, nil
}

func (r *DbService) AddUserToDashboard(dashboardId string, userId string, access string) (*string, error) {
	var id *string
	row := sq.Insert("dashboards_user").Columns("user_id", "dashboard_id", "access").
		Values(userId, dashboardId, access).
		Suffix("returning id").
		RunWith(r.conn).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&id); err != nil {
		return nil, err
	}
	return id, nil
}
