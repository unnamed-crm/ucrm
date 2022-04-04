package api

import (
	"encoding/json"
	"net/http"

	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/core"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	dispatcher    *core.Dispatcher
	dashboardRepo repository.DashboardRepository
	config        config.Config
}

func NewController(dispatcher *core.Dispatcher, dashboardRepo repository.DashboardRepository, config config.Config) *Controller {
	return &Controller{
		dispatcher:    dispatcher,
		dashboardRepo: dashboardRepo,
		config:        config,
	}
}

func (c *Controller) CreateQueue(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload CreateQueuePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	userId := auth.GetUserIdFromContext(ctx)
	reciever := c.dispatcher.GetChannel(payload.DashboardId)
	queue, err := reciever.AddQueue(c.config.RabbitMq, payload.DashboardId, payload.ChatId, userId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	httpext.JSON(w, queue.GetOptions(), http.StatusOK)
}

func (c *Controller) Ping(w http.ResponseWriter, r *http.Request) {
	var payload PingPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	reciever := c.dispatcher.GetRecieverByQueueName(payload.QueueName)
	if reciever == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "queue name not found",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if err := reciever.Ping(payload.QueueName, payload.Time); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) Unsubscribe(w http.ResponseWriter, r *http.Request) {
	var payload SubscribePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	reciever := c.dispatcher.GetChannel(payload.DashboardId)
	isInternal, err := reciever.Unsubscribe(payload.QueueName)
	if err != nil {
		if isInternal {
			httpext.JSON(w, httpext.CommonError{
				Error: err.Error(),
				Code:  http.StatusInternalServerError,
			}, http.StatusInternalServerError)
			return
		} else {
			httpext.JSON(w, httpext.CommonError{
				Error: err.Error(),
				Code:  http.StatusNotFound,
			}, http.StatusNotFound)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}
