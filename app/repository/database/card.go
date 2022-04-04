package database

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
	blogger "github.com/sirupsen/logrus"
)

func (r *DbService) AddCard(ctx context.Context, name string, pipelineId string) (*models.Card, error) {
	card := &models.Card{}
	var orderRow sql.NullInt32
	order := 1

	row := sq.Select(`max("order")`).
		From("cards").
		Where(sq.Eq{"pipeline_id": pipelineId}).
		PlaceholderFormat(sq.Dollar).
		RunWith(r.pool.Read()).
		QueryRow()

	if err := row.Scan(&orderRow); err != nil {
		blogger.Errorf("[card/AddCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	if orderRow.Valid {
		order = int(orderRow.Int32) + 1
	}

	row = sq.Insert("cards").
		Columns("name", "pipeline_id", `"order"`).
		Values(name, pipelineId, order).
		Suffix(`returning id, name, pipeline_id, updated_at, "order"`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()

	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		blogger.Errorf("[card/AddCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	var chat models.Chat
	chatRow := sq.Insert("chats").
		Columns("card_id").
		Values(card.Id).
		Suffix(`returning id, card_id, last_sender, last_employee_id, last_message`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := chatRow.Scan(&chat.Id, &chat.CardId, &chat.LastSender, &chat.LastEmployeeId, &chat.LastMessageId); err != nil {
		blogger.Errorf("[card/AddCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	card.Chat = &chat
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
			qb := sq.Update("card_fields c").
				Set("value", value).
				Where(sq.Eq{"c.id": key})

			if isUpdateWithTransaction {
				qb = qb.RunWith(tx)
			} else {
				qb = qb.RunWith(r.pool.Write())
			}

			_, err := qb.
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

			rows, err := tx.Query(completeSql, &name, cardId)
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

			defer rows.Close()

			fields := make([]models.CardField, 0)
			for rows.Next() {
				var field models.CardField
				if err := rows.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order,
					&field.Id, &field.CardId, &field.FieldId, &field.Value); err != nil {
					return nil, err
				}

				fields = append(fields, field)
			}

			if err = tx.Commit(); err != nil {
				blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
				return nil, err
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
			RunWith(r.pool.Write()).
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
	fields := make([]models.CardField, 0)

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

func (r *DbService) UpdateOrderForCards(ctx context.Context, cardIdsToNewOrder map[string]int) error {
	queryArgs := make([]interface{}, 0)
	valuesForUpdate := make([]string, 0)
	argIndex := 1

	for id, order := range cardIdsToNewOrder {
		valuesForUpdate = append(
			valuesForUpdate, fmt.Sprintf(`($%d::uuid, %d)`, argIndex, order),
		)
		queryArgs = append(queryArgs, id)
		argIndex++
	}

	sql := fmt.Sprintf(`
		update cards
		set "order" = tmp.new_order
		from ( values
			%s
		) as tmp(id, new_order)
		where cards.id = tmp.id
	`, strings.Join(valuesForUpdate, ","),
	)

	_, err := r.pool.Write().Exec(sql, queryArgs...)
	if err != nil {
		blogger.Errorf("[card/UpdateOrderForCards] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return err
	}

	return nil
}

func (r *DbService) GetCardsByCardPipelineId(ctx context.Context, cardId string) ([]models.Card, error) {
	cards := []models.Card{}

	selectPipelineSql, _, err := sq.Select("pipeline_id").
		From("cards").
		Where("id = ?").
		PlaceholderFormat(sq.Dollar).
		ToSql()
	if err != nil {
		blogger.Errorf("[pipeline/GetAllPipelinesByPipeline] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	completeSql := fmt.Sprintf(`
		with p as (%s)
		select id, "order" from cards 
		where pipeline_id = (select p.pipeline_id from p)
	`, selectPipelineSql)

	rows, err := r.pool.Read().Query(completeSql, cardId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		blogger.Errorf("[pipeline/GetAllPipelinesByPipeline] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		var c models.Card
		if err := rows.Scan(&c.Id, &c.Order); err != nil {
			blogger.Errorf("[pipeline/GetAllPipelinesByPipeline] CTX: [%v], ERROR:[%s]", ctx, err.Error())
			return nil, err
		}

		cards = append(cards, c)
	}

	return cards, nil
}
