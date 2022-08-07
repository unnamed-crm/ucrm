package api

import "errors"

type CreateTagPayload struct {
	DashboardId string `json:"dashboard_id"`
	Text string `json:"text"`
	Description *string `json:"description,omitempty"`
	Color string `json:"color"`
}

func (p *CreateTagPayload) Validate() error {
	if len(p.Text) == 0 {
		return errors.New("incorrect params for tag create")
	}

	return nil
}
