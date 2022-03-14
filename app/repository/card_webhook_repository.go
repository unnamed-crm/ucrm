package repository

import "github.com/ignavan39/ucrm-go/app/models"

type CardWebhookRepository interface {
	AddCardWebhook(dashboardId string, url string, name *string) error
	GetCardWebhookByDashboardId(dashboardId string) (*models.CardWebhook, error)
	GetCardWebhookByPipelineId(pipelineId string) (*models.CardWebhook, error)
}
