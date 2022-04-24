package ws

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	websocket "github.com/gorilla/websocket"
	"github.com/ignavan39/ucrm-go/app/core"
	"github.com/ignavan39/ucrm-go/app/dashboard"
	blogger "github.com/sirupsen/logrus"
)

type Controller struct {
	repo       dashboard.Repository
	dispatcher *core.Dispatcher
}

func NewController(repo dashboard.Repository, dispatcher *core.Dispatcher) *Controller {
	return &Controller{
		repo:       repo,
		dispatcher: dispatcher,
	}
}

func (c *Controller) WsEndpoint(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		blogger.Error(err)
	}

	if err != nil {
		return
	}
	xClientToken := r.Header.Get("x-client-token")
	settings, err := c.repo.GetSettings(xClientToken)
	if err != nil {
		blogger.Error(err.Error())
	}

	blogger.Info(settings.DashboardId)
	blogger.Infof("[Connected :%s]", r.Host)
	for {
		mt,msg,err := conn.ReadMessage()
		if mt == websocket.CloseMessage {
			conn.WriteMessage(websocket.CloseMessage,[]byte("warning: received unsupported message"))
			conn.Close()
		}
		if _, ok := err.(*websocket.CloseError); ok {
			blogger.Error("error closing websocket")
		}

		if err != nil {
			blogger.Println("warning: read message error:", err)
			continue
		}
		if mt != websocket.TextMessage && mt != websocket.CloseMessage {
			conn.WriteMessage(websocket.CloseInvalidFramePayloadData,[]byte("warning: received unsupported message"))
			blogger.Warn("warning: received unsupported message: ", mt, msg)
			continue
		}

		if mt == websocket.TextMessage {
			var payload WebsocketMessagePayload
			err := json.NewDecoder(r.Body).Decode(&payload)
			if err != nil {
				conn.WriteMessage(websocket.CloseInvalidFramePayloadData,[]byte("warning: received unsupported message"))
				continue
			}
		}
	}
}

func RegisterRouter(r chi.Router, controller *Controller) {
	r.Get("/ws", controller.WsEndpoint)
}
