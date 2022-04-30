package api

import (
	"encoding/json"
	"net/http"

	"ucrm/app/auth"
	"ucrm/app/config"
	"ucrm/app/core"
	"ucrm/app/dashboard"
	"ucrm/pkg/httpext"
)

type Controller struct {
	dispatcher    *core.Dispatcher
	dashboardRepo dashboard.Repository
	config        config.Config
}

func NewController(dispatcher *core.Dispatcher, dashboardRepo dashboard.Repository, config config.Config) *Controller {
	return &Controller{
		dispatcher:    dispatcher,
		dashboardRepo: dashboardRepo,
		config:        config,
	}
}

// CreateQueue godoc
// @Accept       json
// @Produce      json
// @Summary      Create queue
// @Description  Create queue
// @Param        payload  body      CreateQueuePayload  true  " "
// @Success      200      {object}  core.ClientQueueConfig
// @Failure      400      {object}  httpext.CommonError
// @Failure      401      {object}  httpext.CommonError
// @Failure      500      {object}  httpext.CommonError
// @Tags         connect
// @Router       /connect/create [post]
// @security     JWT
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

// CreateQueue godoc
// @Accept       json
// @Summary      Ping
// @Description  Ping
// @Param        payload  body  PingPayload  true  " "
// @Tags         connect
// @Success      200
// @Failure      400  {object}  httpext.CommonError
// @Failure      401  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /connect/ping [post]
// @security     JWT
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

// Unsubscribe godoc
// @Summary      Unsubscribe
// @Description  Unsubscribe
// @Accept       json
// @Param        payload  body  SubscribePayload  true  " "
// @Tags         connect
// @Success      200
// @Failure      400  {object}  httpext.CommonError
// @Failure      401  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /connect/unsubscribe [post]
// @security     JWT
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
