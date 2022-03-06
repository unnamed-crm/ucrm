package dashboards

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	repo repository.DashboardRepository
}

func NewController(repo repository.DashboardRepository) *Controller {
	return &Controller{repo: repo}
}

func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload CreateDashboardPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	userId := auth.GetUserIdFromContext(ctx)
	dashboard, err := c.repo.AddDashboard(payload.Name, userId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	httpext.JSON(w, CreateDashboardResponse{
		Dashboard: *dashboard,
	}, http.StatusCreated)
}

func (c *Controller) AddUserToDashboard(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload AddUserToDashboardPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	err = payload.Validate()
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	userId := auth.GetUserIdFromContext(ctx)
	dashboard, err := c.repo.GetOneDashboard(payload.DashboardId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	if dashboard == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "dashboard not found",
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}
	found := false
	for _, d := range dashboard.Users {
		if d.UserId == userId && d.Access == "rw" {
			found = true
		}
	}
	if !found {
		httpext.JSON(w, httpext.CommonError{
			Error: "not enough permissions",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	if dashboard.AuthorId == payload.UserId {
		httpext.JSON(w, httpext.CommonError{
			Error: "user author this dashboard",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	id, err := c.repo.AddUserToDashboard(payload.DashboardId, payload.UserId, payload.Access)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	httpext.JSON(w, AddUserToDashboardResponse{
		UserDashboardId: *id,
	}, 201)
}

func (c *Controller) GetOneDashboard(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if len(id) == 0 {
		httpext.JSON(w,httpext.CommonError{
			Error: "wrong id",
			Code: http.StatusBadRequest,
		},http.StatusBadRequest)
		return
	}

	
}