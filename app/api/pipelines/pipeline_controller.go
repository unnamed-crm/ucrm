package pipelines

import (
	"encoding/json"
	"net/http"

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
	pipeline, err := c.repo.AddPipeline(payload.Name, payload.DashboardId,payload.Order)
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

func (c *Controller) UpdateOrder(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	order := chi.URLParam(r, "order")

	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missign id: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	if len(order) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missign order: pipelines/updateOrder",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
}