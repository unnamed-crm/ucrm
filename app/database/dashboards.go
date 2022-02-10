package database

import (
	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/tm-go/app/models"
)

func (r *DbService) AddDashboard(name string,userId string) (*models.Dashboard, error) {
	dashboard := &models.Dashboard{}
	row := sq.Insert("dashboards").Columns("name", "user_id").
		Values(name, userId).
		Suffix("returning id,name,user_id,updated_at").
		RunWith(r.conn).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&dashboard.Id, &dashboard.Name, &dashboard.UserId, &dashboard.UpdatedAt); err != nil {
		return nil, err
	}
	return dashboard, nil
}