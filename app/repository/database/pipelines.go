package database

import (
	"database/sql"
	"errors"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) AddPipeline(name string, dashboardId string) (*models.Pipeline, error) {
	pipeline := &models.Pipeline{}
	row := sq.Insert("pipelines").Columns("name", "dashboard_id").
		Values(name, dashboardId).
		Suffix(`returning id,name,"order",dashboard_id,updated_at`).
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&pipeline.Id, &pipeline.Name, &pipeline.Order, &pipeline.DashboardId, &pipeline.UpdatedAt); err != nil {
		return nil, err
	}
	return pipeline, nil
}

func (r *DbService) GetOnePipeline(pipelineId string) (*models.Pipeline, error) {
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
