package core

import (
	"errors"
	"fmt"
	"sync"
	"time"

	"ucrm/app/config"
	blogger "github.com/sirupsen/logrus"
	"github.com/streadway/amqp"
)

type Reciever struct {
	pool        map[string]*ClientQueue
	queueOut    chan *ClientQueuePayload
	conn        *amqp.Connection
	middlewares []Middleware
	close       chan int
	sync.RWMutex
}

func NewReciever(queueOut chan *ClientQueuePayload, conn *amqp.Connection) *Reciever {
	return &Reciever{
		pool:     make(map[string]*ClientQueue),
		queueOut: queueOut,
		conn:     conn,
		close:    make(chan int),
	}
}

func (r *Reciever) Start() *Reciever {
	r.removeUselessQueues(15*time.Second, false)
	return r
}

func (r *Reciever) AddQueue(
	conf config.RabbitMqConfig,
	dashboardId string,
	chatId string,
	userId string,
) (*ClientQueue, error) {

	r.RLock()
	defer r.RUnlock()
	queue, err := NewClientQueue(conf, dashboardId, chatId, userId, r.conn)
	if err != nil {
		return nil, err
	}

	queue.Start(r.queueOut)
	r.pool[queue.config.QueueName] = queue

	return queue, nil
}

func (r *Reciever) removeUselessQueues(timer time.Duration, rage bool) {
	go func() {
		for {
			time.Sleep(timer)
			r.RLock()
			for _, q := range r.pool {
				if time.Now().Add(time.Duration(-10)*time.Second).After(q.lastPing) || rage {
					blogger.Infof("Try to stop queue:%s", q.config.QueueName)

					err := q.Stop()
					if err != nil {
						blogger.Errorf("[QUEUE: %s] Error stop", q.config.QueueName, err.Error())
					} else {
						delete(r.pool, q.config.QueueName)
						blogger.Infof("queue stopped:%s", q.config.QueueName)
					}
				}
			}

			r.RUnlock()
			if rage {
				r.close <- 1
				return
			}
		}
	}()
}

func (r *Reciever) Ping(queueName string, time time.Time) error {
	r.RLock()
	defer r.RUnlock()

	queue, found := r.pool[queueName]
	if !found {
		return fmt.Errorf("queue with name :%s not fond", queueName)
	}

	queue.SetLastPing(time)
	return nil
}

func (r *Reciever) Unsubscribe(queueName string) (bool, error) {
	r.RLock()
	defer r.RUnlock()
	queue, found := r.pool[queueName]

	if !found {
		return false, errors.New("queue not found")
	}

	errorChan := make(chan error)
	defer close(errorChan)

	err := queue.Stop()
	if err != nil {
		return true, err
	}

	delete(r.pool, queueName)
	return false, nil
}

func (r *Reciever) Out() <-chan *ClientQueuePayload {
	return r.queueOut
}

func (r *Reciever) WithMiddleware(m Middleware) *Reciever {
	r.middlewares = append(r.middlewares, m)
	m.Start()
	return r
}

func (r *Reciever) Stop() {
	r.removeUselessQueues(0*time.Second, true)
	<-r.close
	close(r.close)
}
