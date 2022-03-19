package repository

import "github.com/ignavan39/ucrm-go/app/models"

type CardRepository interface {
	AddCard(name string, order int, pipelineId string) (*models.Card, error)
	UpdateCard(cardId string, name string) (*models.Card, error)
	GetOneCard(cardId string) (*models.Card, error)
	GetOneCardWithRelations(cardId string, relations []string) (*models.Card, error)
	DeleteOneCard(cardId string) error
	UpdateOrderForCard(cardId string, pipelineId string, oldOrder int, newOrder int) error
}
