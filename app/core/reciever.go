package core

import (
	"errors"
	"fmt"
	"time"

	"github.com/ignavan39/ucrm-go/app/config"
	blogger "github.com/sirupsen/logrus"
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

func (r *Reciever) Start() *Reciever {
	go r.RemoveUselessQueues()
	return r
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

	queue.Start(d.queueOut)
	d.pool[queue.config.QueueName] = queue

	return queue, nil
}

func (d *Reciever) RemoveUselessQueues() {
	for {
		time.Sleep(15 * time.Second)
		for _, q := range d.pool {
			if time.Now().Add(time.Duration(-10) * time.Second).Before(q.lastPing) {
				blogger.Infof("Try to stop queue:%s", q.config.QueueName)

				err := q.Stop()
				if err != nil {
					blogger.Errorf("[QUEUE: %s] Error stop", q.config.QueueName, err.Error())
				} else {
					delete(d.pool, q.config.QueueName)
					blogger.Infof("queue stopped:%s", q.config.QueueName)
				}
			}
		}
	}
}

func (d *Reciever) Ping(queueName string, time time.Time) error {
	queue, found := d.pool[queueName]
	if !found {
		return fmt.Errorf("queue with name :%s not fond", queueName)
	}

	queue.SetLastPing(time)
	return nil
}

func (d *Reciever) Unsubscribe(queueName string) (bool, error) {
	queue, found := d.pool[queueName]

	if !found {
		return false, errors.New("queue not found")
	}

	errorChan := make(chan error)
	defer close(errorChan)

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
