package core

import (
	"github.com/ignavan39/ucrm-go/app/chat"
	"github.com/streadway/amqp"
)

type Dispatcher struct {
	receivers map[string]*Receiver
	queues    map[string]chan *ClientQueuePayload
	conn      *amqp.Connection
	chatRepo  chat.Repository
}

func NewDispatcher(conn *amqp.Connection, chatRepo chat.Repository) *Dispatcher {
	return &Dispatcher{
		receivers: make(map[string]*Receiver),
		queues:    make(map[string]chan *ClientQueuePayload),
		conn:      conn,
		chatRepo:  chatRepo,
	}
}

func (d *Dispatcher) GetReceiverByQueueName(queueName string) *Receiver {
	for _, r := range d.receivers {
		for name := range r.pool {
			if name == queueName {
				return r
			}
		}
	}

	return nil
}

func (d *Dispatcher) GetChannel(dashboardId string) *Receiver {
	receiver, found := d.receivers[dashboardId]
	if found {
		return receiver
	}

	channel := make(chan *ClientQueuePayload)
	historyWriter := NewHistroyWriterMiddleware(d.chatRepo, channel)
	newReceiver := NewReceiver(channel, d.conn).
		WithMiddleware(historyWriter).
		Start()
	d.receivers[dashboardId] = newReceiver

	return newReceiver
}

func (d *Dispatcher) Stop() {
	for _, v := range d.receivers {
		v.Stop()
	}
}
