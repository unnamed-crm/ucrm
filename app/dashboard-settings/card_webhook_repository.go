package repository

import "ucrm/app/models"

type CardWebhookRepository interface {
	AddCardWebhook(dashboardId string, url string, name *string) error
	GetCardWebhookByDashboardId(dashboardId string) (*models.CardWebhook, error)
	GetCardWebhookByPipelineId(pipelineId string) (*models.CardWebhook, error)
}
