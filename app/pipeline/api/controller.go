package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/app/pipeline"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
	blogger "github.com/sirupsen/logrus"
)

type Controller struct {
	repo pipeline.Repository
}

func NewController(repo pipeline.Repository) *Controller {
	return &Controller{repo: repo}
}

func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload CreateOnePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload: pipelines/createOne",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pipeline, err := c.repo.Create(payload.Name, payload.DashboardId)
	if err != nil {
		blogger.Errorf("[pipeline/create] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	var Response struct {
		Pipeline models.Pipeline `json:"pipeline"`
	}
	Response.Pipeline = *pipeline

	httpext.JSON(w, Response, http.StatusCreated)
}

func (c *Controller) UpdateName(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload struct {
		Name string `json:"name"`
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload: pipelines/updateName",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	id := chi.URLParam(r, "pipelineId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing id: pipelines/updateName",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = c.repo.UpdateName(id, payload.Name)
	if err != nil {
		blogger.Errorf("[pipeline/updateName] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) DeleteById(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := chi.URLParam(r, "pipelineId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing id: pipelines/deleteById",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.repo.DeleteById(id)
	if err != nil {
		blogger.Errorf("[pipeline/delete] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) UpdateOrder(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	pipelineId := chi.URLParam(r, "pipelineId")
	orderQuery := chi.URLParam(r, "order")

	if len(pipelineId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing id: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(orderQuery) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing order: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	newOrder, err := strconv.Atoi(orderQuery)
	if err != nil || newOrder < 1 {
		httpext.JSON(w, httpext.CommonError{
			Error: "incorrect value for order: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pipelines, err := c.repo.GetAllByPipeline(pipelineId)
	if err != nil {
		blogger.Errorf("[pipeline/updateOrder] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	if len(pipelines) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "pipelines is empty",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	maxOrder := 0
	var pipeline models.Pipeline
	for _, p := range pipelines {
		if p.Id == pipelineId {
			if p.Order == newOrder {
				httpext.JSON(w, httpext.CommonError{
					Error: "Incorrect new order for update",
					Code:  http.StatusBadRequest,
				}, http.StatusBadRequest)
				return
			}
			pipeline = p
		}
		if p.Order >= maxOrder {
			maxOrder = p.Order
		}
	}

	if newOrder > maxOrder {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong order",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pipelineIdToNewOrder := make(map[string]int)

	for _, p := range pipelines {
		if newOrder > pipeline.Order {
			if p.Id == pipelineId {
				if p.Order == newOrder {
					continue
				} else {
					pipelineIdToNewOrder[p.Id] = newOrder
				}
			} else if p.Order <= newOrder && p.Order > pipeline.Order {
				pipelineIdToNewOrder[p.Id] = p.Order - 1
			}
		} else {
			if p.Id == pipelineId {
				if p.Order == newOrder {
					continue
				} else {
					pipelineIdToNewOrder[p.Id] = newOrder
				}
			} else if p.Order >= newOrder && p.Order < pipeline.Order {
				pipelineIdToNewOrder[p.Id] = p.Order + 1
			}
		}
	}

	err = c.repo.UpdateOrders(pipelineIdToNewOrder)
	if err != nil {
				blogger.Errorf("[pipeline/updateOrder] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[UpdateOrder]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
