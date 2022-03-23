package repository

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/models"
)

type ContactRepository interface {
	GetOneContact(ctx context.Context, contactId string) (*models.Contact, error)
	AddContact(ctx context.Context, dashboardId string, cardId *string, name string, phone string, city string) (*models.Contact, error)
	UpdateContact(ctx context.Context, contactId string, name *string, phone *string, city *string) error
	RenameContact(ctx context.Context, contactId string, newName string) error
	ChangeCard(ctx context.Context, contactId string, cardId string) error
	DeleteContact(ctx context.Context, contactId string) error
}
