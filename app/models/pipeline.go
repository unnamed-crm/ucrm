package models

import "time"

type Pipeline struct {
	Id          string    `json:"id"`
	Name        string    `json:"name"`
	DashboardId string    `json:"dashboard_id"`
	Order       int       `json:"order"`
	UpdatedAt   time.Time `json:"update_at"`
}
