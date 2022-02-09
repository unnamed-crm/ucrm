package models

import "time"

type Dashboard struct {
	UserId string `json:"user_id"`
	Name string `json:"name"`
	Id string `json:"id"`
	UpdatedAt time.Time `json:"updated_at"`
}