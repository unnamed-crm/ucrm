package models

import "time"

type Chat struct {
	Id string `json:"id"`
	CardId string `json:"card_id"`
	LastSender string `json:"last_sender"`
	LastEmployee string `json:"last_employee,omitempty"`
	LastMessage string `json:"last_message"`
}

type Payload struct {
	Text string `json:"text,omitempty"`
	Image []string `json:"images,omitempty"`
	Video []string `json:"videos,omitempty"`
}

type Message struct {
	Id string `json:"id"`
	ChatId string `json:"chat_id"`
	Payload Payload `json:"payload"`
	SenderId string `json:"sender_id"`
	CreatedAt time.Time `json:"created_at"`
	Deleted bool `json:"deleted"`
	Status string `json:"status"`
}
