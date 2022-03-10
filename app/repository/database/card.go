package database

import (
	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) AddCard(name string, order int, pipelineId string) (*models.Card, error) {
	card := &models.Card{}
	row := sq.Insert("cards").Columns("name", "pipeline_id", `"order"`).
		Values(name, pipelineId, order).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}
	return card, nil
}

//TODO custom fields
func (r *DbService) UpdateCard(cardId string, name string) (*models.Card, error) {
	card := &models.Card{}
	row := sq.Update("cards").Set("name", name).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}
	return card, nil
}

func (r *DbService) GetOneCard(cardId string) (*models.Card, error) {
	card := &models.Card{}
	row := sq.Select("id", "name", "pipeline_id", "updated_at", `"order"`).
		From("cards").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Read()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}
	return card, nil
}

func (r *DbService) DeleteOneCard(cardId string) error {
	_, err := sq.Delete("cards").Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Write()).PlaceholderFormat(sq.Dollar).Exec()
	if err != nil {
		return err
	}
	return nil
}
