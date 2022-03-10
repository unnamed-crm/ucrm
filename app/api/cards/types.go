package cards

type CreateOnePayload struct {
	PipelineId string `json:"pipeline_id"`
	Order      int    `json:"order"`
	Name       string `json:"name"`
}
