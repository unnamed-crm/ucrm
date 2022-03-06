package pipelines

import (
	"encoding/json"
	"net/http"

	"github.com/ignavan39/ucrm-go/app/auth"
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
	ctx := r.Context()
	var payload struct {
		Name        string `json:"name"`
		DashboardId string `json:"dashboard_id"`
	}
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	userId := auth.GetUserIdFromContext(ctx)
	pipeline, err := c.repo.AddPipeline(payload.Name, userId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	var Response struct {
		pipeline models.Pipeline `json:"pipeline"`
	}
	Response.pipeline = *pipeline
	httpext.JSON(w, Response, http.StatusCreated)
}
