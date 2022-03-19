package core

import (
	"encoding/json"

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
	err         chan error
	Delivery    <-chan amqp.Delivery
	stop        chan bool
	rabbitQueue amqp.Queue
	channel     *amqp.Channel
}

func NewClientQueue(config ClientQueueConfig, conn *amqp.Connection) (*ClientQueue, error) {

	amqpChannel, err := conn.Channel()
	if err != nil {
		return nil, err
	}

	queue, err := amqpChannel.QueueDeclare(config.QueueName, true, false, false, false, nil)
	if err != nil {
		return nil, err
	}
	msgs, err := amqpChannel.Consume(
		config.QueueName,
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
		config:      config,
		queueIn:     make(chan *ClientQueuePayload),
		err:         make(chan error),
		Delivery:    msgs,
		stop:        make(chan bool),
		rabbitQueue: queue,
		channel:     amqpChannel,
	}, nil
}

func (c *ClientQueue) Start(queueOut chan *ClientQueuePayload) {
	go func() {
		for d := range c.Delivery {
			var payload ClientQueuePayload
			err := json.Unmarshal(d.Body, &payload)
			if err != nil {

			}
			queueOut <- &payload
		}
	}()
	<-c.stop
}
func (c *ClientQueue) Stop() error {
	_, err := c.channel.QueueDelete(c.config.QueueName, true, true, true)
	if err != nil {
		blogger.Errorf("[%s] : %s",c.config.QueueName,err.Error())
		return err
	}
	c.stop <- true
	return nil
}

func (c *ClientQueue) GetOptions() ClientQueueConfig {
	return c.config
}
