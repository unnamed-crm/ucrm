package database

import (
	"context"
	"database/sql"
	"errors"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
	blogger "github.com/sirupsen/logrus"
)

func (r *DbService) GetOneContact(ctx context.Context, contactId string) (*models.Contact, error) {
	contact := &models.Contact{}

	rows, err := sq.Select("c.id", "c.dashboard_id", "c.card_id", "c.name",
		"c.phone", "c.city", "f.name", "cf.*").
		From("contacts c").
		Where(sq.Eq{"c.id": contactId}).
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
	fields := []models.ContactField{}

	for rows.Next() {
		var field models.ContactField
		var name, id, contactId, fieldId, value sql.NullString

		if err := rows.Scan(&contact.Id, &contact.DashboardId, &contact.CardId, &contact.Name, &contact.Phone, &contact.City,
			&name, &id, &contactId, &fieldId, &value,
		); err != nil {
			blogger.Errorf("[card/GetOneCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
			return nil, err
		}

		if name.Valid {
			field.Name = name.String
			field.Id = id.String
			field.ContactId = contactId.String
			field.FieldId = fieldId.String
			field.Value = &value.String

			fields = append(fields, field)
		}

	}
	contact.Fields = fields

	return contact, nil
}

func (r *DbService) AddContact(ctx context.Context, dashboardId string, cardId *string, name string, phone string, city string) (*models.Contact, error) {
	contact := &models.Contact{}

	row := sq.Insert("contacts").
		Columns("dashboard_id", "card_id", "name", "phone", "city").
		Suffix("returning id, dashboard_id, card_id, name, phone, city").
		Values(dashboardId, &cardId, name, phone, city).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&contact.Id, &contact.DashboardId, &contact.CardId, &contact.Name, &contact.Phone, &contact.City); err != nil {
		blogger.Errorf("[contact/Delete] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	return contact, nil
}

func (r *DbService) UpdateContact(ctx context.Context, contactId string, name *string, phone *string, city *string, contactFields *map[string]string) error {
	var isContactDataUpdate bool = name != nil || phone != nil || city != nil
	var isUpdateWithTransaction bool = isContactDataUpdate && contactFields != nil
	var tx *sql.Tx

	if contactFields != nil {
		if isUpdateWithTransaction {
			var err error
			tx, err = r.pool.Write().Begin()
			if err != nil {
				blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
				return err
			}
		}

		for key, value := range *contactFields {
			qb := sq.Update("contact_fields c").
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
						return err
					}
				}

				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
		}
	}

	if isContactDataUpdate {
		qb := sq.Update("contacts")
		if name != nil {
			qb = qb.Set("name", name)
		}

		if phone != nil {
			qb = qb.Set("phone", phone)
		}

		if city != nil {
			qb = qb.Set("city", city)
		}

		qb = qb.Where(sq.Eq{"id": contactId}).
			PlaceholderFormat(sq.Dollar)

		if isUpdateWithTransaction {
			qb = qb.RunWith(tx)
		} else {
			qb = qb.RunWith(r.pool.Write())
		}

		_, err := qb.Exec()
		if err != nil {
			if isUpdateWithTransaction {
				if err := tx.Rollback(); err != nil {
					blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
					return err
				}
			}

			if errors.Is(err, sql.ErrNoRows) {
				return nil
			}
			return err
		}

		if isUpdateWithTransaction {
			if err = tx.Commit(); err != nil {
				blogger.Errorf("[card/update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
				return err
			}
		}
	}

	return nil
}

func (r *DbService) RenameContact(ctx context.Context, contactId string, newName string) error {
	_, err := sq.Update("contacts c").
		Set("name", newName).
		Where(sq.Eq{"c.id": contactId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		blogger.Errorf("[contact/Delete] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return err
	}

	return nil
}

func (r *DbService) DeleteContact(ctx context.Context, contactId string) error {
	_, err := sq.Delete("contacts").
		Where(sq.Eq{"id": contactId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		blogger.Errorf("[contact/Delete] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return err
	}

	return nil
}
