package models

type CardWebhook struct {
	Url         string  `json:"url"`
	DashboardId string  `json:"dashboard_id"`
	Name        *string `json:"name,omitempty"`
}
