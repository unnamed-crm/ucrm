package repository

import (
	"github.com/ignavan39/ucrm-go/app/models"
)

type DashboardRepository interface {
	AddDashboard(name string, userId string) (*models.Dashboard, error)
	GetOneDashboard(dashboardId string) (*models.Dashboard, error)
	AddUserToDashboard(dashboardId string, userId string, access string) (*string, error)
	GetOneDashboardWithUserAccess(dashboardId string, userId string, accessType string) (*models.Dashboard, error)
	UpdateDashboardName(dashboardId string, name string) error
	DeleteDashboardById(dashboardId string) error
}

type UserRepository interface {
	GetOneUserByEmail(email string, password string) (*models.User, error)
	AddUser(email string, password string) (*models.User, error)
}

type PipelineRepository interface {
	AddPipeline(name string, dashboardId string, order int) (*models.Pipeline, error)
	UpdatePipelineName(pipelineId string, name string) error
	DeletePipelineById(pipelineId string) error
	GetOnePipeline(pipelineId string) (*models.Pipeline, error)
	GetAccessPipelineById(pipelineId string, userId string, accessType string) (bool, error)
	GetAllPipelines(dashboardId string) ([]models.Pipeline, error)
	UpdatePipelineOrder(pipelineId string, order int) error
}

type CardWebhookRepository interface {
	AddCardWebhook(dashboardId string, url string, name *string) error
	GetCardWebhookByDashboardId(dashboardId string) (*models.CardWebhook, error)
	GetCardWebhookByPipelineId(pipelineId string) (*models.CardWebhook, error)
}

type CardRepository interface {
	AddCard(name string, order int, pipelineId string) (*models.Card, error)
	UpdateCard(cardId string, name string) (*models.Card, error)
	GetOneCard(cardId string) (*models.Card, error)
	DeleteOneCard(cardId string) error
}
