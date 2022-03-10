package cards

import "github.com/ignavan39/ucrm-go/app/models"

type CreateOnePayload struct {
	PipelineId string `json:"pipeline_id"`
	Order      int    `json:"order"`
	Name       string `json:"name"`
}

type UpdateOnePayload struct {
	Name string `json:"name"`
	// TODO custom fields
	Fields *map[string]models.CardField `json:"fields,omitempty"`
}
