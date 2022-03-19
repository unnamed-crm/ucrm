package models

import "time"

type MessagePayload struct {
	Text   string   `json:"text,omitempty"`
	Images []string `json:"images,omitempty"`
}

type Message struct {
	Id        string         `json:"id"`
	Payload   MessagePayload `json:"payload"`
	SenderId  string         `json:"sender_id"`
	CreatedAt time.Time      `json:"created_at"`
	Deleted   bool           `json:"deleted"`
	Status    string         `json:"status"`
	ChatId    string         `json:"chat_id"`
}
