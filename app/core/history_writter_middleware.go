package core

import (
	"github.com/ignavan39/ucrm-go/app/repository"
	blogger "github.com/sirupsen/logrus"
)

type HistroyWriterMiddleware struct {
	messageRepo repository.MessageRepository
	queue       chan *ClientQueuePayload
}

func NewHistroyWriterMiddleware(messageRepo repository.MessageRepository, queue chan *ClientQueuePayload) *HistroyWriterMiddleware {
	return &HistroyWriterMiddleware{
		messageRepo: messageRepo,
		queue:       queue,
	}
}

func (hwm *HistroyWriterMiddleware) Start() {
	go func(p <-chan *ClientQueuePayload) {
		for {
			payload, more := <-p
			if !more {
				break
			}
			_, err := hwm.messageRepo.CreateOneMessage(
				payload.Message.Payload,
				payload.Message.SenderId,
				payload.Message.Deleted,
				payload.Message.Status,
				payload.Message.CreatedAt,
				payload.Message.ChatId,
			)
			if err != nil {
				blogger.Error(err.Error())
			}
			hwm.queue <- payload
		}
	}(hwm.queue)
}
