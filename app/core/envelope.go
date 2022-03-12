package core

import "github.com/ignavan39/ucrm-go/app/models"

type Envelope struct {
	Payload models.Message `json:"payload"`
	ChatId string `json:"chat_id"`
}
