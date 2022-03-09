package database

import (
	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) AddCard(name string,order int,pipelineId string) (*models.Card, error) {
	card := &models.Card{}
	row := sq.Insert("cards").Columns("name", "pipeline_id",`"order"`).
		Values(name, pipelineId,order).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt,&card.Order); err != nil {
		return nil, err
	}
	return card, nil
}