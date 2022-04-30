package chat

import (
	"time"

	"ucrm/app/models"
)

type Repository interface {
	CreateOneMessage(payload models.MessagePayload, senderId string, deleted bool, status string, createdAt time.Time, chatId string) (*models.Message, error)
}
