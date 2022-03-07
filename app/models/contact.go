package models

type Contact struct {
	Id          string  `json:"id"`
	DashboardId string  `json:"dashboard_id"`
	CardId      *string `json:"card_id,omitempty"`
	Name        *string `json:"name,omitempty"`
	Phone       string  `json:"phone"`
	City        *string `json:"city,omitempty"`
	Fields      []Field `json:"fields"`
}
