package card

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/models"
)

const CardFieldType string = "card"

type Repository interface {
	CreateOne(ctx context.Context, name string, order int, pipelineId string) (*models.Card, error)
	Update(ctx context.Context, cardId string, name *string, cardFields *map[string]string) (*models.Card, error)
	CheckExists(ctx context.Context, cardId string) (bool, error)
	GetOne(ctx context.Context, cardId string) (*models.Card, error)
	GetOneWithoutRelations(ctx context.Context, cardId string) (*models.Card, error)
	Delete(ctx context.Context, cardId string) error
	UpdateOrder(ctx context.Context, cardId string, pipelineId string, oldOrder int, newOrder int) error
}
