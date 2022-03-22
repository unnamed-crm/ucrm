package cards

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
