package core

import (
	"errors"

	"github.com/ignavan39/ucrm-go/app/config"
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

func (d *Reciever) AddQueue(
	conf config.RabbitMqConfig,
	dashboardId string,
	chatId string,
	userId string,
) (*ClientQueue, error) {
	queues, found := d.pool[dashboardId]
	queue, err := NewClientQueue(conf, dashboardId, chatId, userId, d.conn)
	if err != nil {
		return nil, err
	}
	if !found {
		queues = []*ClientQueue{queue}
	} else {
		queues = append(queues, queue)
	}
	d.pool[dashboardId] = queues
	return queue, nil
}

func (d *Reciever) Subscribe(dashboardId string, queueName string) error {
	queues, found := d.pool[dashboardId]
	if !found {
		return errors.New("queue not found")
	}
	for _, q := range queues {
		if q.config.QueueName == queueName {
			q.Start(d.queueOut)
			return nil
		}
	}
	return errors.New("queue not found")
}

func (d *Reciever) Unsubscribe(dashboardId string, queueName string) (bool,error) {
	queues, found := d.pool[dashboardId]
	if !found {
		return false,errors.New("queue not found")
	}
	index := -1
	for idx, q := range queues {
		if q.config.QueueName == queueName {
			index = idx
			err := q.Stop()
			if err != nil {
				return true,err
			}
		}
	}
	if index == -1 {
		return false,errors.New("queue not found")
	}
	queues = append(queues[:index], queues[index+1:]...)
	d.pool[dashboardId] = queues
	return false,nil 
}

func (d *Reciever) Out() <-chan *ClientQueuePayload {
	return d.queueOut
}
