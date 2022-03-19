package core

import (
	"errors"

	"github.com/streadway/amqp"
)

type Reciever struct {
	pool     map[string][]*ClientQueue
	queueOut chan *ClientQueuePayload
	conn     *amqp.Connection
}

func NewReciever(queueOut chan *ClientQueuePayload, conn *amqp.Connection) *Reciever {
	return &Reciever{
		pool:     map[string][]*ClientQueue{},
		queueOut: queueOut,
		conn:     conn,
	}
}

func (d *Reciever) AddQueue(queueConf ClientQueueConfig) error {
	queues, found := d.pool[queueConf.DashboardId]
	queue, err := NewClientQueue(queueConf, d.conn)
	if err != nil {
		return err
	}
	if !found {
		queues = []*ClientQueue{queue}
	} else {
		queues = append(queues, queue)
	}
	d.pool[queueConf.DashboardId] = queues
	return nil
}

func (d *Reciever) Subscribe(dashboardId string, queueName string) error {
	queues, found := d.pool[dashboardId]
	if !found {
		return errors.New("queue not found")
	}
	for _, q := range queues {
		if q.config.QueueName == queueName {
			go q.Start(d.queueOut)
			return nil
		}
	}
	return errors.New("queue not found")
}

func (d *Reciever) Unsubscribe(dashboardId string, queueName string) error {
	queues, found := d.pool[dashboardId]
	if !found {
		return errors.New("queue not found")
	}
	for _, q := range queues {
		if q.config.QueueName == queueName {
			q.Stop()
			return nil
		}
	}
	return errors.New("queue not found")
}

func (d *Reciever) Out() <-chan *ClientQueuePayload {
	return d.queueOut
}
