package core

import (
	"github.com/streadway/amqp"
)

type Dispatcher struct {
	recievers map[string]*Reciever
	queues    map[string]chan *ClientQueuePayload
	conn      *amqp.Connection
}

func NewDispatcher(conn *amqp.Connection) *Dispatcher {
	return &Dispatcher{
		recievers: make(map[string]*Reciever),
		queues:    make(map[string]chan *ClientQueuePayload),
		conn:      conn,
	}
}

func (d *Dispatcher) GetChannel(dashboardId string) *Reciever {
	reciever, found := d.recievers[dashboardId]
	if found {
		return reciever
	}

	channel := make(chan *ClientQueuePayload)
	newReciever := NewReciever(channel, d.conn)
	d.recievers[dashboardId] = newReciever
	
	return newReciever
}
