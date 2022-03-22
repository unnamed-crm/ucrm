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

func (r *DbService) CheckCardExists(ctx context.Context, cardId string) (bool, error) {
	query, _, err := sq.Select("1").
		From("cards").
		Where("id = ?").
		PlaceholderFormat(sq.Dollar).
		ToSql()

	if err != nil {
		blogger.Errorf("[card/CheckCardExists] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return false, err
	}

	completeSql := fmt.Sprintf(`select exists (%s) as "exists"`, query)
	rows, err := r.pool.Read().
		Query(completeSql, cardId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			blogger.Errorf("[card/CheckCardExists] CTX: [%v], ERROR:[%s]", ctx, err.Error())
			return false, err
		}

		blogger.Errorf("[card/CheckCardExists] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return false, err
	}

	var isExists bool
	if err := rows.Scan(&isExists); err != nil {
		blogger.Errorf("[card/CheckCardExists] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return false, err
	}

	return isExists, nil
}

func (r *DbService) UpdateCard(ctx context.Context, cardId string, name *string, cardFields *map[string]string) (*models.Card, error) {
	card := &models.Card{}

	if cardFields != nil {
		var isUpdateWithTransaction = name != nil
		var tx *sql.Tx

		if isUpdateWithTransaction {
			var err error
			tx, err = r.pool.Write().Begin()
			if err != nil {
				blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
				return nil, err
			}
		}

		for key, value := range *cardFields {
			_, err := sq.Update("card_fields c").
				Set("value", value).
				Where(sq.Eq{"c.id": key}).
				RunWith(r.pool.Write()).
				PlaceholderFormat(sq.Dollar).
				Exec()

			if err != nil {
				if isUpdateWithTransaction {
					if err := tx.Rollback(); err != nil {
						blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
						return nil, err
					}
				}

				if errors.Is(err, sql.ErrNoRows) {
					return nil, nil
				}
				return nil, err
			}
		}

		if isUpdateWithTransaction {
			updateSql, _, err := sq.Update("cards").
				Set("name", &name).
				Where("id = ?").
				Suffix(`returning id, name, pipeline_id, updated_at, "order"`).
				PlaceholderFormat(sq.Dollar).
				ToSql()
			if err != nil {
				if err = tx.Rollback(); err != nil {
					blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
				}
				return nil, err
			}

			completeSql := fmt.Sprintf(`
				with updated as (%s) 
				select updated.*, card_fields.* from updated
				left join card_fields
				on updated.id = card_fields.card_id
			`, updateSql)

			rows, err := r.pool.Write().Query(completeSql, &name, cardId)
			if err != nil {
				if err = tx.Rollback(); err != nil {
					blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
					return nil, err
				}

				if errors.Is(err, sql.ErrNoRows) {
					return nil, nil
				}
				return nil, err
			}

			if err = tx.Commit(); err != nil {
				blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
				return nil, err
			}

			defer rows.Close()

			fields := []models.CardField{}
			for rows.Next() {
				var field models.CardField
				if err := rows.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order,
					&field.Id, &field.CardId, &field.FieldId, &field.Value); err != nil {
					return nil, err
				}

				fields = append(fields, field)
			}

			card.Fields = fields
		} else {
			return r.GetOneCard(ctx, cardId)
		}
	} else {
		rows := sq.Update("cards c").
			Set("name", name).
			Where(sq.Eq{"c.id": cardId}).
			Suffix(`returning id, pipeline_id, name, updated_at, "order"`).
			PlaceholderFormat(sq.Dollar).
			RunWith(r.pool.Read()).
			QueryRow()
		if err := rows.Scan(&card.Id, &card.PipelineId, &card.Name, &card.UpdatedAt, &card.Order); err != nil {
			return nil, err
		}
	}

	return card, nil
}

func (r *DbService) GetOneCard(ctx context.Context, cardId string) (*models.Card, error) {
	card := &models.Card{}

	rows, err := sq.Select("c.id", "c.name", "c.pipeline_id", "c.updated_at", `c."order"`, "f.name", "cf.*").
		From("cards c").
		Where(sq.Eq{"c.id": cardId}).
		LeftJoin("card_fields cf on cf.card_id = c.id").
		LeftJoin("fields f on f.id = cf.field_id").
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		Query()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		blogger.Errorf("[card/GetOneCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	defer rows.Close()
	fields := []models.CardField{}

	for rows.Next() {
		var field models.CardField
		if err := rows.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order,
			&field.Name,
			&field.Id, &field.CardId, &field.FieldId, &field.Value,
		); err != nil {
			blogger.Errorf("[card/GetOneCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
			return nil, err
		}

		fields = append(fields, field)
	}
	card.Fields = fields

	return card, nil
}

func (r *DbService) GetOneCardWithoutRelations(ctx context.Context, cardId string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Select("id", "name", "pipeline_id", "updated_at", `"order"`).
		From("cards c").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		blogger.Errorf("[card/GetOneCardWithoutRelations] CTX: [%v], ERROR:[%s]", ctx, err.Error())
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
		blogger.Errorf("[card/DeleteOneCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
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

		blogger.Errorf("[card/UpdateOrderForCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return err
	}

	return nil
}
