package models

type Tag struct {
	Id          string  `json:"id"`
	DashboardId string  `json:"dashboard_id"`
	Text        string  `json:"text"`
	Description *string `json:"description,omitempty"`
	Color       string  `json:"color"`
}
