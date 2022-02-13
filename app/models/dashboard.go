package models

import "time"

type Dashboard struct {
	AuthorId string `json:"author_id"`
	Name string `json:"name"`
	Id string `json:"id"`
	UpdatedAt time.Time `json:"updated_at"`
}