package api

import "errors"

type CreateOnePayload struct {
	PipelineId string `json:"pipeline_id"`
	Order      int    `json:"order"`
	Name       string `json:"name"`
}

type UpdateOnePayload struct {
	Name   *string            `json:"name"`
	Fields *map[string]string `json:"fields,omitempty"`
}

type UpdateOrder struct {
	OldOrder int `json:"old_order"`
}

func (p *UpdateOnePayload) Validate() error {
	if p.Fields == nil && (p.Name == nil || len(*p.Name) == 0) {
		return errors.New("Incorrect params for card update")
	}

	return nil
}
