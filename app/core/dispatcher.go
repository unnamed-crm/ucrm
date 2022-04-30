package core

import (
	"ucrm/app/chat"
	"github.com/streadway/amqp"
)

type Dispatcher struct {
	recievers map[string]*Reciever
	queues    map[string]chan *ClientQueuePayload
	conn      *amqp.Connection
	chatRepo  chat.Repository
}

func NewDispatcher(conn *amqp.Connection, chatRepo chat.Repository) *Dispatcher {
	return &Dispatcher{
		recievers: make(map[string]*Reciever),
		queues:    make(map[string]chan *ClientQueuePayload),
		conn:      conn,
		chatRepo:  chatRepo,
	}
}

func (d *Dispatcher) GetRecieverByQueueName(queueName string) *Reciever {
	for _, r := range d.recievers {
		for name := range r.pool {
			if name == queueName {
				return r
			}
		}
	}

	return nil
}

func (d *Dispatcher) GetChannel(dashboardId string) *Reciever {
	reciever, found := d.recievers[dashboardId]
	if found {
		return reciever
	}

	channel := make(chan *ClientQueuePayload)
	historyWriter := NewHistroyWriterMiddleware(d.chatRepo, channel)
	newReciever := NewReciever(channel, d.conn).
		WithMiddleware(historyWriter).
		Start()
	d.recievers[dashboardId] = newReciever

	return newReciever
}

func (d *Dispatcher) Stop() {
	for _, v := range d.recievers {
		v.Stop()
	}
}
