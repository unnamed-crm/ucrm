package contact

import (
	"context"
	"errors"

	"ucrm/app/models"
)

type Repository interface {
	GetOne(ctx context.Context, contactId string) (*models.Contact, error)
	Create(ctx context.Context, dashboardId string, cardId *string, name string, phone string, city string, fields *map[string]string) (*models.Contact, error)
	Update(ctx context.Context, contactId string, name *string, phone *string, city *string, fields *map[string]string) error
	Rename(ctx context.Context, contactId string, newName string) error
	Delete(ctx context.Context, contactId string) error
}

var ErrFieldNotFound = errors.New("found not found")
