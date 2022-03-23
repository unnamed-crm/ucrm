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
		if err := rows.Scan(&contact.Id, &contact.DashboardId, &contact.CardId, &contact.Name,
			&contact.Phone, &contact.City,
			&field.Name, &field.Id, &field.ContactId, &field.Value,
		); err != nil {
			blogger.Errorf("[card/GetOneCard] CTX: [%v], ERROR:[%s]", ctx, err.Error())
			return nil, err
		}

		fields = append(fields, field)
	}
	contact.Fields = fields

	return contact, nil
}

func (r *DbService) AddContact(ctx context.Context, dashboardId string, cardId *string, name string, phone string, city string) (*models.Contact, error) {
	contact := &models.Contact{}

	row := sq.Insert("contacts").
		Columns("dashboard_id", "card_id", "name", "phone", "city").
		Values(dashboardId, &cardId, name, phone, city).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&contact.Id, &contact.DashboardId, &contact.CardId, &contact.Name, &contact.City); err != nil {
		blogger.Errorf("[contact/Delete] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	return contact, nil
}

func (r *DbService) UpdateContact(ctx context.Context, contactId string, name *string, phone *string, city *string) error {
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

func (r *DbService) ChangeCard(ctx context.Context, contactId string, cardId string) error {
	_, err := sq.Update("contacts").
		Set("card_id", cardId).
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
