package database

import (
	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) GetOneContact(contactId string) (*models.Contact, error) {
	contact := &models.Contact{}

	// row = sq.Select("id, dashboardId, card_id, name, phone, city").
	// 	From("contacts c").Where(sq.Eq{"c.id": contactId}).
	// 	RunWith(r.pool.Read()).
	// 	PlaceholderFormat(sq.Dollar).
	// 	QueryRow()

	return contact, nil
}

func (r *DbService) AddContact(dashboardId string, cardId *string, name string, phone string, city string) (*models.Contact, error) {
	contact := &models.Contact{}

	row := sq.Insert("contacts").
		Columns("dashboard_id", "card_id", "name", "phone", "city").
		Values(dashboardId, &cardId, name, phone, city).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&contact.Id, &contact.DashboardId, &contact.CardId, &contact.Name, &contact.City); err != nil {
		return nil, err
	}

	return contact, nil
}

func (r *DbService) UpdateContact(contactId string) error {
	return nil
}

func (r *DbService) RenameContact(contactId string, newName string) error {
	_, err := sq.Update("contacts c").
		Set("name", newName).
		Where(sq.Eq{"c.id": contactId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *DbService) DeleteContact(contactId string) error {
	_, err := sq.Delete("contacts").
		Where(sq.Eq{"id": contactId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}
