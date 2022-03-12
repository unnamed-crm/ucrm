package core

import (
	"encoding/json"
	"sync"

	websocket "github.com/gorilla/websocket"
	blogger "github.com/sirupsen/logrus"
)

type Reader interface {
	Read(pkg []byte)
}

type Writer interface {
	Write(pkg []byte)
}

type Pool struct {
	Channels map[string]Channel
}

type BasicChannel interface {
	Reader
	Writer
}

type Channel struct {
	conn       websocket.Conn // WebSocket connection.
	writeQueue chan *Envelope  // Outgoing packets queue.
	readQueue  chan *Envelope
}

func NewChannel(conn websocket.Conn) *Channel {
	c := &Channel{
		conn:       conn,
		writeQueue: make(chan *Envelope),
		readQueue:  make(chan *Envelope),
	}

	return c
}

func (c *Channel) Write() {
	var wg sync.WaitGroup
	wg.Add(1)
	go func(queue <-chan *Envelope) {
		defer wg.Done()
		for {
			env, more := <-queue
			if !more {
				break
			}
			paylod, err := json.Marshal(*env)
			if err != nil {
				blogger.Error(err.Error())
			}
			b := []byte(paylod)
			c.conn.WriteMessage(websocket.BinaryMessage, b)
		}
	}(c.readQueue)
	wg.Wait()
}
func (c *Channel) Read() {
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		for {
			t, msg, err := c.conn.ReadMessage()
			if err != nil {
				if err != nil {
					blogger.Error(err)
					break
				}
			}
			if t == websocket.BinaryMessage {
				env:= &Envelope{}
				err := json.Unmarshal(msg, env)
				if err != nil {
					blogger.Error(err)
					break
				}
				c.writeQueue <- env
			}
		}
	}()
	wg.Wait()
}
