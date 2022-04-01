package pipelines

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	repo repository.PipelineRepository
}

func NewController(repo repository.PipelineRepository) *Controller {
	return &Controller{repo: repo}
}

func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
	var payload CreateOnePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload: pipelines/createOne",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pipeline, err := c.repo.AddPipeline(payload.Name, payload.DashboardId, payload.Order)
	if err != nil {
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

	err = c.repo.UpdatePipelineName(id, payload.Name)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) DeleteById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "pipelineId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing id: pipelines/deleteById",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.repo.DeletePipelineById(id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) UpdateOrder(w http.ResponseWriter, r *http.Request) {
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
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "incorrect value for order: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	var payload UpdateOrder
	err = json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload: pipelines/createOne",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pipelines, err := c.repo.GetAllPipelinesByPipeline(pipelineId)
	fmt.Println(len(pipelines))
	var pipeline models.Pipeline
	for _, p := range pipelines {
		if p.Id == pipelineId {
			pipeline = p
		}
	}
	if err != nil {
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

	for _, p := range pipelines {
		if newOrder > pipeline.Order  {
			if p.Id == pipelineId {
				if p.Order == newOrder {
					continue
				} else {
					c.repo.UpdateOrderForPipeline(p.Id, newOrder)
				}
			} else if p.Order <= newOrder && p.Order > pipeline.Order {
				c.repo.UpdateOrderForPipeline(p.Id, p.Order-1)
			}
		} else {
			if p.Id == pipelineId {
				if p.Order == newOrder {
					continue
				} else {
					c.repo.UpdateOrderForPipeline(p.Id, newOrder)
				}
			}else if p.Order >= newOrder && p.Order < pipeline.Order {
				c.repo.UpdateOrderForPipeline(p.Id, p.Order+1)
			}
		}
	}
	w.WriteHeader(http.StatusOK)
}
