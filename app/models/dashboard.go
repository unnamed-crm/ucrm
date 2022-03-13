package models

import "time"

type Dashboard struct {
	AuthorId  string            `json:"author_id"`
	Name      string            `json:"name"`
	Id        string            `json:"id"`
	UpdatedAt time.Time         `json:"updated_at"`
	Users     []DashboardsUsers `json:"users,omitempty"`
	Pipelines []Pipeline        `json:"pipelines"`
}

type DashboardsUsers struct {
	Id          string `json:"id"`
	Access      string `json:"access"`
	UserId      string `json:"user_id"`
	DashboardId string `json:"dashboard_id"`
}

type DashboardSettings struct {
	Id string `json:"id"`
	DashboardId string `json:"dashboard_id"`
	ClientToken string `json:"client_token"`
	Secret string `json:"secret"`
}
