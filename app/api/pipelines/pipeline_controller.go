package pipelines

import (
	"encoding/json"
	"net/http"
	"strconv"

	// "strconv"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/core/utils"
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
	id := chi.URLParam(r, "pipelineId")
	orderQuery := chi.URLParam(r, "order")
	dashboardId := chi.URLParam(r, "dashboardId")

	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing id: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	if len(orderQuery) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing order id: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	if len(dashboardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing dashboard id: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	order, err := strconv.Atoi(orderQuery)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	pipelines, err := c.repo.GetAllPipelines(dashboardId)
	if len(pipelines) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "pipelines not found: pipelines/updateOrder",
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	var oldPipele models.Pipeline
	for _, p := range pipelines {
		if p.Id == id {
			oldPipele = p
		}
	}

	newArr, updated := utils.Sort(pipelines,oldPipele.Order,order,id)
	if updated {
		for _,p := range newArr {
			c.repo.UpdatePipelineOrder(p.Id,p.Order)
		}
	}
	httpext.JSON(w, newArr, http.StatusOK)

}
