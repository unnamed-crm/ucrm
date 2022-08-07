package card

import (
	"errors"

	"ucrm/app/models"
)

type Repository interface {
	CreateOne(name string, pipelineId string, fields *map[string]string) (*models.Card, error)
	Update(cardId string, name *string, cardFields *map[string]string) (*models.Card, error)
	CheckExists(cardId string) (bool, error)
	GetOne(cardId string) (*models.Card, error)
	GetOneWithoutRelations(cardId string) (*models.Card, error)
	Delete(cardId string) error
	UpdateOrders(cardIdsToNewOrder map[string]int) error
	GetAllByPipelineId(cardId string) ([]models.Card, error)
	CreateTag(cardId string, dashboardId string, text string, description string, color string) (*models.Tag, error)
}

var ErrFieldNotFound = errors.New("field not found")
