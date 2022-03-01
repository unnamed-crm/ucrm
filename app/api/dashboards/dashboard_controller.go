package dashboards

import (
	"encoding/json"
	"net/http"

	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/usecase"
	"github.com/ignavan39/tm-go/pkg/httpext"
)

type DashboardController struct {
	useCase usecase.DashboardUseCase
}

func NewController(useCase usecase.DashboardUseCase) *DashboardController {
	return &DashboardController{useCase: useCase}
}

func (c *DashboardController) CreateOne(w http.ResponseWriter, r *http.Request) {
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
	userId := ctx.Value(auth.ContextUserKey).(string)
	dashboard, err := c.useCase.AddDashboard(payload.Name, userId)
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

func (c *DashboardController) AddUserToDashboard(w http.ResponseWriter, r *http.Request) {
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
	userId := ctx.Value(auth.ContextUserKey).(string)
	dashboard, err := c.useCase.GetOneDashboard(payload.DashboardId)
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
	if dashboard.AuthorId != userId {
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
	id, err := c.useCase.AddUserToDashboard(payload.DashboardId, payload.UserId, payload.Access)
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
