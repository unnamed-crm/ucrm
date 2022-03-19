package core

import (
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/streadway/amqp"
)

type Dispatcher struct {
	recievers   map[string]*Reciever
	queues      map[string]chan *ClientQueuePayload
	conn        *amqp.Connection
	messageRepo repository.MessageRepository
}

func NewDispatcher(conn *amqp.Connection, messageRepo repository.MessageRepository) *Dispatcher {
	return &Dispatcher{
		recievers:   make(map[string]*Reciever),
		queues:      make(map[string]chan *ClientQueuePayload),
		conn:        conn,
		messageRepo: messageRepo,
	}
}

func (d *Dispatcher) GetChannel(dashboardId string) *Reciever {
	reciever, found := d.recievers[dashboardId]
	if found {
		return reciever
	}

	channel := make(chan *ClientQueuePayload)
	historyWriter := NewHistroyWriterMiddleware(d.messageRepo, channel)
	newReciever := NewReciever(channel, d.conn).
		WithMiddleware(historyWriter)
	d.recievers[dashboardId] = newReciever

	return newReciever
}
