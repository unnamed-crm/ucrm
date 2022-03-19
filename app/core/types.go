package core

import "github.com/ignavan39/ucrm-go/app/models"

type ClientQueuePayload struct {
	Message models.MessagePayload
	RoutingKey string `json:"routing_key"`
	DashboardId string `json:"dashboard_id"`
}
