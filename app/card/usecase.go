package card

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/models"
)

type UseCase interface {
	CreateOne(ctx context.Context, pipelineId string, order int, name string) (*models.Card,error)
	Delete(ctx context.Context, id string) (*models.Card, error)
	Update(ctx context.Context, id string, name *string, fields *map[string]string) (*models.Card, error)
	GetOne(ctx context.Context, id string) (*models.Card, error)
	UpdateOrder(ctx context.Context, cardId string, pipelineId string, oldOrder int, newOrder int) error
}
