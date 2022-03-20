package database

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strconv"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
	blogger "github.com/sirupsen/logrus"
)

func (r *DbService) AddCard(ctx context.Context, name string, order int, pipelineId string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Insert("cards").
		Columns("name", "pipeline_id", `"order"`).
		Values(name, pipelineId, order).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	return card, nil
}

func (r *DbService) UpdateCard(cardId string, name string) (*models.Card, error) {
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

func (r *DbService) GetOneCardWithRelations(cardId string, relations []string) (*models.Card, error) {
	card := &models.Card{}

	qb := sq.Select("id", "name", "pipeline_id", "updated_at", `"order"`).
		From("cards c").
		Where(sq.Eq{"id": cardId})

	for _, relation := range relations {
		if relation == "card_fields" {
			qb.LeftJoin("card_fields cf on f.id = cf.card_id = c.id")
			break
		}
	}

	row := qb.RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *DbService) DeleteOneCard(ctx context.Context, cardId string) error {
	_, err := sq.Delete("cards").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return err
	}

	return nil
}

func (r *DbService) UpdateOrderForCard(ctx context.Context, cardId string, pipelineId string, oldOrder int, newOrder int) error {
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

		blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return err
	}

	return nil
}
