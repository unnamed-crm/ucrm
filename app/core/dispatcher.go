package core

import (
	"errors"
	"fmt"

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

func (d *Dispatcher) AddChannel(dashboardId string) error {
	_, found := d.recievers[dashboardId]
	if found {
		return errors.New(fmt.Sprintf("[%s] channel exsist", dashboardId))
	}
	channel := make(chan *ClientQueuePayload)
	reciever := NewReciever(channel, d.conn)
	d.recievers[dashboardId] = reciever
	return nil
}
