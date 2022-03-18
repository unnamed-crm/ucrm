package database

import (
	"database/sql"
	"errors"
	"fmt"
	"strconv"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) AddCard(name string, order int, pipelineId string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Insert("cards").
		Columns("name", "pipeline_id", `"order"`).
		Values(name, pipelineId, order).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *DbService) UpdateCard(cardId string, name string, fields  models.CardField) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Update("cards").
		Set("name", name).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
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
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *DbService) DeleteOneCard(cardId string) error {
	_, err := sq.Delete("cards").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *DbService) UpdateOrderForCard(cardId string, pipelineId string, oldOrder int, newOrder int) error {
	if newOrder <= 0 {
		return errors.New("incorrect order for pipeline")
	}

	var changeOperator string
	var comparisionMark string

	if newOrder > oldOrder {
		changeOperator = "-"
		comparisionMark = "<="
	} else {
		changeOperator = "+"
		comparisionMark = ">="
	}

	_, err :=
		sq.Update("cards c").
			Set(`"order"`,
				sq.Case().
					When(sq.Expr("c.id = ?", cardId), strconv.Itoa(newOrder)).
					When(sq.Expr(fmt.Sprintf("c.order %s ?", comparisionMark), strconv.Itoa(newOrder)),
						fmt.Sprintf("c.order %s 1", changeOperator)).
					Else(sq.Expr(`"order"`)),
			).
			Where(sq.Eq{"pipeline_id": pipelineId}).
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

func (r *DbService) AddCustomFieldForCard(dashboardId string, cardId string, name string, isNullable bool) (*models.Field, error) {
	field := &models.Field{}
	fieldType := "card"

	row := sq.Insert("fields f").
		Columns("name", "dashboard_id", "is_nullable", "type").
		Values(name, dashboardId, isNullable, fieldType).
		Suffix(`returning id, name, dashboard_id, is_nullable, type`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()

	if err := row.Scan(&field.Id, &field.Name, &field.DashboardId, &field.IsNullable, &field.Type); err != nil {
		return nil, err
	}

	_, err := sq.Insert("card_fields c").
		Columns("card_id", "field_id", "value").
		Values(cardId, field.Id, "").
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return field, nil
		}
		return nil, err
	}

	return field, nil
}
