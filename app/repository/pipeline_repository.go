package repository

import (
	"github.com/ignavan39/ucrm-go/app/models"
)

type PipelineRepository interface {
	AddPipeline(name string, dashboardId string, order int) (*models.Pipeline, error)
	UpdatePipelineName(pipelineId string, name string) error
	DeletePipelineById(pipelineId string) error
	GetOnePipeline(pipelineId string) (*models.Pipeline, error)
	GetAccessPipelineById(pipelineId string, userId string, accessType string) (bool, error)
	GetAllPipelines(dashboardId string) ([]models.Pipeline, error)
	UpdateOrderForPipeline(pipelineId string, newOrder int) error
	GetAllPipelinesByPipeline(pipelineId string) ([]models.Pipeline, error)
}
