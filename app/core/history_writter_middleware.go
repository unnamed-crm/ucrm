package core

import (
	"github.com/ignavan39/ucrm-go/app/chat"
	blogger "github.com/sirupsen/logrus"
)

type HistroyWriterMiddleware struct {
	chatRepo chat.Repository
	queue       chan *ClientQueuePayload
}

func NewHistroyWriterMiddleware(chatRepo chat.Repository, queue chan *ClientQueuePayload) *HistroyWriterMiddleware {
	return &HistroyWriterMiddleware{
		chatRepo: chatRepo,
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
			_, err := hwm.chatRepo.CreateOneMessage(
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
