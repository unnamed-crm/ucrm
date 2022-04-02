package repository

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/models"
)

const CardFieldType string = "card"

type CardRepository interface {
	AddCard(ctx context.Context, name string, order int, pipelineId string) (*models.Card, error)
	UpdateCard(ctx context.Context, cardId string, name *string, cardFields *map[string]string) (*models.Card, error)
	CheckCardExists(ctx context.Context, cardId string) (bool, error)
	GetOneCard(ctx context.Context, cardId string) (*models.Card, error)
	GetOneCardWithoutRelations(ctx context.Context, cardId string) (*models.Card, error)
	DeleteOneCard(ctx context.Context, cardId string) error
	UpdateOrderForCard(ctx context.Context, cardId string, order int) error
	GetCardsByCardPipelineId(cardId string) ([]models.Card, error)
}
