package dashboards

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	repo        repository.DashboardRepository
	webhookRepo repository.CardWebhookRepository
}

func NewController(repo repository.DashboardRepository, webhookRepo repository.CardWebhookRepository) *Controller {
	return &Controller{repo: repo, webhookRepo: webhookRepo}
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
	id := chi.URLParam(r, "dashboardId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
}

func (c *Controller) UpdateName(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "dashboardId")
	var payload UpdateNamePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Name) < 2 {
		httpext.JSON(w, httpext.CommonError{
			Error: "name too short",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = c.repo.UpdateDashboardName(id, payload.Name)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) DeleteById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "dashboardId")

	err := c.repo.DeleteDashboardById(id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) AddWebhook(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "dashboardId")
	var payload AddWebhookPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Url) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "url to short",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = c.webhookRepo.AddCardWebhook(id, payload.Url, payload.Name)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func (c *Controller) AddSettings(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "dashboardId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	var payload AddSettingsPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pwd := sha1.New()
	pwd.Write([]byte(payload.Secret))

	xClientToken := fmt.Sprintf("%x", pwd.Sum(nil))
	settings, err := c.repo.AddDashboardSettings(id, payload.Secret, xClientToken)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	
	httpext.JSON(w, settings, http.StatusOK)
}
