package api

import "time"

type CreateQueuePayload struct {
	DashboardId string `json:"dashboard_id"`
	ChatId      string `json:"chat_id"`
}

type SubscribePayload struct {
	DashboardId string `json:"dashboard_id"`
	QueueName   string `json:"queue_name"`
}

type PingPayload struct {
	QueueName string    `json:"queue_name"`
	Time      time.Time `json:"time"`
}
