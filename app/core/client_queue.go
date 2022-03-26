package core

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/streadway/amqp"

	blogger "github.com/sirupsen/logrus"
)

type ClientQueueConfig struct {
	RoutingKey  string `json:"routing_key"`
	Exchange    string `json:"exchange"`
	QueueName   string `json:"queue_name"`
	ChatId      string `json:"chatId"`
	UserId      string `json:"userId"`
	DashboardId string `json:"dashboard_id"`
	config.RabbitMqConfig
}

type ClientQueue struct {
	config      ClientQueueConfig
	queueIn     chan *ClientQueuePayload
	Delivery    <-chan amqp.Delivery
	stop        chan int
	rabbitQueue amqp.Queue
	channel     *amqp.Channel
	lastPing    time.Time
}

func NewClientQueue(conf config.RabbitMqConfig, dashboardId string, chatId string, userId string, conn *amqp.Connection) (*ClientQueue, error) {
	amqpChannel, err := conn.Channel()
	if err != nil {
		return nil, err
	}

	pwd := sha1.New()
	pwd.Write([]byte(fmt.Sprintf("%s%s%s", dashboardId, chatId, userId)))
	pwd.Write([]byte(conf.Salt))

	name := fmt.Sprintf("%s-%x", logPrefix(), pwd.Sum(nil))
	queueConfig := &ClientQueueConfig{
		RoutingKey:     name,
		QueueName:      name,
		Exchange:       "amq.topic",
		ChatId:         chatId,
		DashboardId:    dashboardId,
		UserId:         userId,
		RabbitMqConfig: conf,
	}

	queue, err := amqpChannel.QueueDeclare(name, true, false, false, false, nil)
	if err != nil {
		return nil, err
	}

	err = amqpChannel.QueueBind(name, name, "amq.topic", true, nil)
	if err != nil {
		return nil, err
	}

	msgs, err := amqpChannel.Consume(
		name,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, err
	}

	return &ClientQueue{
		config:      *queueConfig,
		queueIn:     make(chan *ClientQueuePayload),
		Delivery:    msgs,
		stop:        make(chan int),
		rabbitQueue: queue,
		channel:     amqpChannel,
		lastPing:    time.Now(),
	}, nil
}

func (c *ClientQueue) Start(queueOut chan *ClientQueuePayload) {
	go func() {
		var wg sync.WaitGroup
		wg.Add(1)
		defer close(c.stop)
		go func() {
			defer wg.Done()
			blogger.Infof("[QUEUE] start consume for: %s", c.config.QueueName)
			for d := range c.Delivery {
				var payload ClientQueuePayload
				err := json.Unmarshal(d.Body, &payload)
				if err != nil {
					blogger.Errorf("[ClientQueue][Queue :%s] failed decode", c.config.QueueName)
				} else {
					queueOut <- &payload
				}
			}
		}()
		c.stop <- 1
		wg.Wait()
	}()
}

func (c *ClientQueue) Stop() error {
	<-c.stop
	_, err := c.channel.QueueDelete(c.config.QueueName, false, false, true)

	if err != nil {
		blogger.Errorf("[%s] : %s", c.config.QueueName, err.Error())
		return err
	}
	return nil
}

func (c *ClientQueue) GetOptions() ClientQueueConfig {
	return c.config
}

func (c *ClientQueue) SetLastPing(time time.Time) {
	c.lastPing = time
}

func logPrefix() string {
	return "cleint-sub"
}
