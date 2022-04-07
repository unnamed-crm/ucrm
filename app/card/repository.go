package card

import (
	"github.com/ignavan39/ucrm-go/app/models"
)

const CardFieldType string = "card"

type Repository interface {
	CreateOne(name string, pipelineId string) (*models.Card, error)
	Update(cardId string, name *string, cardFields *map[string]string) (*models.Card, error)
	CheckExists(cardId string) (bool, error)
	GetOne(cardId string) (*models.Card, error)
	GetOneWithoutRelations(cardId string) (*models.Card, error)
	Delete(cardId string) error
	UpdateOrders(cardIdsToNewOrder map[string]int) error
	GetAllByPipelineId(cardId string) ([]models.Card, error)
}
