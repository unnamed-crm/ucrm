package models

import "time"

type Card struct {
	Id         string      `json:"id"`
	UpdatedAt  time.Time   `json:"updated_at"`
	PipelineId string      `json:"pipeline_id"`
	Order      int         `json:"order"`
	Name       string      `json:"name"`
	Contacts   []Contact   `json:"contacts"`
	Fields     []CardField `json:"fields"`
	Tags []Tag `json:"tags"`
}
