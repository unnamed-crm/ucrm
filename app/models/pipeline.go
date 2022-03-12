package models

import "time"

type Pipeline struct {
	Id          string    `json:"id"`
	Name        string    `json:"name"`
	DashboardId string    `json:"dashboard_id"`
	Order       int       `json:"order"`
	UpdatedAt   time.Time `json:"update_at"`
	Cards       []Card    `json:"card"`
}

func (p *Pipeline) GetOrder() int {
	return p.Order
}

func (p *Pipeline) SetOrder(order int) {
	p.Order = order
}
