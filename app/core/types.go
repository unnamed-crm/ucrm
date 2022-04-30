package core

import "ucrm/app/models"

type ClientQueuePayload struct {
	Message     models.Message
	RoutingKey  string `json:"routing_key"`
	DashboardId string `json:"dashboard_id"`
}

type Middleware interface {
	Start()
}
