package database

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	repository "ucrm/app/card"
	"ucrm/app/dashboard/api"
	"ucrm/app/models"
	"ucrm/pkg/pg"

	sq "github.com/Masterminds/squirrel"
)

type Repository struct {
	pool pg.Pool
}

func NewRepository(pool pg.Pool) *Repository {
	return &Repository{
		pool: pool,
	}
}

func (r *Repository) CreateOne(name string, pipelineId string, fields *map[string]string) (*models.Card, error) {
	card := &models.Card{}
	var dashboardId sql.NullString
	var orderRow sql.NullInt32
	order := 1

	tx, err := r.pool.Write().Begin()
	if err != nil {
		return nil, err
	}

	row := sq.Select(`max(c."order")`, "d.id").
		From("cards c").
		LeftJoin("pipelines p on p.id = c.pipeline_id").
		LeftJoin("dashboards d on p.dashboard_id = d.id").
		Where(sq.Eq{"c.pipeline_id": pipelineId}).
		GroupBy("d.id").
		PlaceholderFormat(sq.Dollar).
		RunWith(tx).
		QueryRow()

	if err := row.Scan(&orderRow, &dashboardId); err != nil {
		return nil, err
	}

	if orderRow.Valid {
		order = int(orderRow.Int32) + 1
	}

	row = sq.Insert("cards").
		Columns("name", "pipeline_id", `"order"`).
		Values(name, pipelineId, order).
		Suffix(`returning id, name, pipeline_id, updated_at, "order"`).
		RunWith(tx).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		if err = tx.Rollback(); err != nil {
			return nil, err
		}

		return nil, err
	}

	if dashboardId.Valid && fields != nil {
		fieldsRow, err := sq.Select("id").
			From("fields f").
			Where(sq.Eq{"f.dashboard_id": dashboardId.String, "f.type": api.FIELD_TYPE_CARD}).
			RunWith(tx).
			PlaceholderFormat(sq.Dollar).
			Query()

		if err != nil {
			if !errors.Is(err, sql.ErrNoRows) {
				return nil, err
			}
		} else {
			fieldsIds := make([]string, 0)

			for fieldsRow.Next() {
				var fieldId string
				if err = fieldsRow.Scan(&fieldId); err != nil {
					return nil, err
				}

				fieldsIds = append(fieldsIds, fieldId)
			}

			fieldsRow.Close()

			noValueFieldIds := make([]string, 0)
			if fields != nil {
				fieldsMap := *fields

				for _, id := range fieldsIds {
					value, found := fieldsMap[id]
					if !found {
						noValueFieldIds = append(noValueFieldIds, id)
					} else {
						_, err := sq.Insert("card_fields").
							Columns("card_id", "field_id", "value").
							Values(card.Id, id, value).
							RunWith(tx).
							PlaceholderFormat(sq.Dollar).
							Exec()

						if err != nil {
							if err = tx.Rollback(); err != nil {
								return nil, err
							}
							return nil, repository.ErrFieldNotFound
						}
					}
				}
			} else {
				noValueFieldIds = fieldsIds
			}

			for _, id := range noValueFieldIds {
				_, err := sq.Insert("card_fields").
					Columns("card_id", "field_id").
					Values(card.Id, id).
					RunWith(tx).
					PlaceholderFormat(sq.Dollar).
					Exec()

				if err != nil {
					if err = tx.Rollback(); err != nil {
						return nil, err
					}
					return nil, err
				}
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *Repository) CheckExists(cardId string) (bool, error) {
	query, _, err := sq.Select("1").
		From("cards").
		Where("id = ?").
		PlaceholderFormat(sq.Dollar).
		ToSql()
	if err != nil {
		return false, err
	}

	completeSql := fmt.Sprintf(`select exists (%s) as "exists"`, query)
	rows, err := r.pool.Read().
		Query(completeSql, cardId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, err
		}

		return false, err
	}

	var isExists bool
	if err := rows.Scan(&isExists); err != nil {
		return false, err
	}

	return isExists, nil
}

func (r *Repository) Update(cardId string, name *string, cardFields *map[string]string) (*models.Card, error) {
	card := &models.Card{}

	if cardFields != nil {
		var isUpdateWithTransaction = name != nil
		var tx *sql.Tx

		if isUpdateWithTransaction {
			var err error
			tx, err = r.pool.Write().Begin()
			if err != nil {
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
					return nil, err
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
				return nil, err
			}

			card.Fields = fields
		} else {
			return r.GetOne(cardId)
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

func (r *Repository) GetOne(cardId string) (*models.Card, error) {
	card := &models.Card{}

	type migratedCardField struct {
		Id      sql.NullString
		CardId  sql.NullString
		FieldId sql.NullString
		Name    sql.NullString
		Value   *string
	}

	type migratedTag struct {
		Id          sql.NullString
		DashboardId sql.NullString
		Text        sql.NullString
		Description *string
		Color       sql.NullString
	}

	rows, err := sq.Select("c.id", "c.name", "c.pipeline_id", "c.updated_at",
		`c."order"`, "f.name", "cf.*", "t.*").
		From("cards c").
		Where(sq.Eq{"c.id": cardId}).
		LeftJoin("card_fields cf on cf.card_id = c.id").
		LeftJoin("fields f on f.id = cf.field_id").
		LeftJoin("card_tags ct on ct.card_id = c.id").
		LeftJoin("tags t on t.id = ct.tag_id").
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
	fields := make([]models.CardField, 0)
	tags := make([]models.Tag, 0)

	var field migratedCardField
	var tag migratedTag

	for rows.Next() {
		if err := rows.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order,
			&field.Name,
			&field.Id, &field.CardId, &field.FieldId, &field.Value,
			&tag.Id, &tag.DashboardId, &tag.Text, &tag.Description, &tag.Color,
		); err != nil {
			return nil, err
		}

		if field.Name.Valid && field.Id.Valid && field.CardId.Valid && field.FieldId.Valid {
			fields = append(fields, models.CardField{
				Id:      field.Id.String,
				CardId:  field.CardId.String,
				FieldId: field.FieldId.String,
				Value:   field.Value,
				Field: models.Field{
					Name: field.Name.String,
				},
			})
		}

		if tag.Id.Valid && tag.Text.Valid && tag.Color.Valid {
			tags = append(tags, models.Tag{
				Id:          tag.Id.String,
				DashboardId: tag.DashboardId.String,
				Text:        tag.Text.String,
				Description: tag.Description,
				Color:       tag.Color.String,
			})
		}

	}
	card.Fields = fields
	card.Tags = tags

	return card, nil
}

func (r *Repository) GetOneWithoutRelations(cardId string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Select("id", "name", "pipeline_id", "updated_at", `"order"`).
		From("cards c").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *Repository) Delete(cardId string) error {
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

func (r *Repository) UpdateOrders(cardIdsToNewOrder map[string]int) error {
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
		return err
	}

	return nil
}

func (r *Repository) GetAllByPipelineId(cardId string) ([]models.Card, error) {
	cards := []models.Card{}

	selectPipelineSql, _, err := sq.Select("pipeline_id").
		From("cards").
		Where("id = ?").
		PlaceholderFormat(sq.Dollar).
		ToSql()
	if err != nil {
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

		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		var c models.Card
		if err := rows.Scan(&c.Id, &c.Order); err != nil {
			return nil, err
		}

		cards = append(cards, c)
	}

	return cards, nil
}
