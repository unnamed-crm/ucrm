package ws

import "github.com/ignavan39/ucrm-go/app/models"

type WebsocketMessagePayload struct {
	chatId  string         `json:"chat_id"`
	userId  string         `json:"user_id"`
	message models.Message `json:"message"`
}
