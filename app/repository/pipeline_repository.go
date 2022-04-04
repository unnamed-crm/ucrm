package repository

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/models"
)

type PipelineRepository interface {
	AddPipeline(ctx context.Context, name string, dashboardId string) (*models.Pipeline, error)
	UpdatePipelineName(ctx context.Context, pipelineId string, name string) error
	DeletePipelineById(ctx context.Context, pipelineId string) error
	GetOnePipeline(ctx context.Context, pipelineId string) (*models.Pipeline, error)
	GetAccessPipelineById(ctx context.Context, pipelineId string, userId string, accessType string) (bool, error)
	GetAllPipelines(ctx context.Context, dashboardId string) ([]models.Pipeline, error)
	UpdateOrderForPipelines(ctx context.Context, pipelineIdsToNewOrder map[string]int) error
	GetAllPipelinesByPipeline(ctx context.Context, pipelineId string) ([]models.Pipeline, error)
}
