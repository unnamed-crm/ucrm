package rmq

import (
	"fmt"

	"github.com/streadway/amqp"
)

func NewConnection(user string, password string, host string, port string) (*amqp.Connection, error) {
	connStr := fmt.Sprintf("amqp://%s:%s@%s:%s", "guest", "guest", host, port)
	fmt.Println(connStr)

	conn, err := amqp.Dial(connStr)
	if err != nil {
		return nil, err
	}

	return conn, nil
}
