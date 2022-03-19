package core

import (
	"errors"

	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/streadway/amqp"
)

type Reciever struct {
	pool        map[string]*ClientQueue
	queueOut    chan *ClientQueuePayload
	conn        *amqp.Connection
	middlewares []Middleware
}

func NewReciever(queueOut chan *ClientQueuePayload, conn *amqp.Connection) *Reciever {
	return &Reciever{
		pool:     make(map[string]*ClientQueue),
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
	queue, err := NewClientQueue(conf, dashboardId, chatId, userId, d.conn)
	if err != nil {
		return nil, err
	}

	d.pool[queue.config.QueueName] = queue
	return queue, nil
}

func (d *Reciever) Subscribe(queueName string) error {
	queue, found := d.pool[queueName]
	if !found {
		return errors.New("queue not found")
	}

	queue.Start(d.queueOut)
	return nil
}

func (d *Reciever) Unsubscribe(queueName string) (bool, error) {
	queue, found := d.pool[queueName]

	if !found {
		return false, errors.New("queue not found")
	}

	err := queue.Stop()
	if err != nil {
		return true, err
	}

	delete(d.pool, queueName)
	return false, nil
}

func (d *Reciever) Out() <-chan *ClientQueuePayload {
	return d.queueOut
}

func (d *Reciever) WithMiddleware(m Middleware) *Reciever {
	d.middlewares = append(d.middlewares, m)
	m.Start()
	return d
}
