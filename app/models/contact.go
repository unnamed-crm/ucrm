package models

type Contact struct {
	Id          string `json:"id"`
	DashboardId string `json:"dashboard_id"`
	CardId      string `json:"card_id"`
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	City        string `json:"city"`
	Fields     []Field `json:"fields"`
}
