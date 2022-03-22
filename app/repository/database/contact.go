package database

import (
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
	blogger "github.com/sirupsen/logrus"
)

func (r *DbService) GetOneContact(ctx context.Context, contactId string) (*models.Contact, error) {
	contact := &models.Contact{}

	// row = sq.Select("id, dashboardId, card_id, name, phone, city").
	// 	From("contacts c").Where(sq.Eq{"c.id": contactId}).
	// 	RunWith(r.pool.Read()).
	// 	PlaceholderFormat(sq.Dollar).
	// 	QueryRow()

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
