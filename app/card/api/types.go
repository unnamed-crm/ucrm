package api

import "errors"

type CreateOnePayload struct {
	PipelineId string             `json:"pipeline_id"`
	Name       string             `json:"name"`
	Fields     *map[string]string `json:"fields,omitempty"`
}

type UpdateOnePayload struct {
	Name   *string            `json:"name"`
	Fields *map[string]string `json:"fields,omitempty"`
}

func (p *UpdateOnePayload) Validate() error {
	if p.Fields == nil && (p.Name == nil || len(*p.Name) == 0) {
		return errors.New("incorrect params for card update")
	}

	return nil
}

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
