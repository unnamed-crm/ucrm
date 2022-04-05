package ws

import (
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

	_, err := upgrader.Upgrade(w, r, nil)
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
}

func RegisterRouter(r chi.Router, controller *Controller) {
	r.Get("/ws", controller.WsEndpoint)
}
