package pipeline

import (
	"github.com/ignavan39/ucrm-go/app/models"
)

type Repository interface {
	Create(name string, dashboardId string) (*models.Pipeline, error)
	UpdateName(pipelineId string, name string) error
	DeleteById(pipelineId string) error
	GetOne(pipelineId string) (*models.Pipeline, error)
	GetAccessById(pipelineId string, userId string, accessType string) (bool, error)
	GetAll(dashboardId string) ([]models.Pipeline, error)
	GetAllByPipeline(pipelineId string) ([]models.Pipeline, error)
	UpdateOrders(pipelineIdsToNewOrder map[string]int) error
}
