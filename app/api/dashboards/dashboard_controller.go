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
	blogger "github.com/sirupsen/logrus"
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

func (c *Controller) AddAccess(w http.ResponseWriter, r *http.Request) {
	var payload AddAccessPayload

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

	dashboard, err := c.repo.GetOneDashboardInternal(payload.DashboardId)
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

	err = c.repo.AddAccessToDashboard(payload.DashboardId, payload.UserId, payload.Access)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
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

	dashboard, err := c.repo.GetOneDashboard(id)
	if err != nil {
		blogger.Error("[dashboard/getOnde] ERROR :%s", err.Error())
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

	httpext.JSON(w, dashboard, http.StatusOK)
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

func (c *Controller) CreateCustomField(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	dashboardId := chi.URLParam(r, "dashboardId")

	if len(dashboardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing dashboardId: dashboards/createCustomField",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	var payload AddCustomField
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload: dashboards/createCustomField",
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

	field, err := c.repo.AddCustomFieldForCards(dashboardId, payload.Name, payload.IsNullable)
	if err != nil {
		blogger.Errorf("[dashboards/createCustomFields] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[CreateCustomField]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, field, http.StatusOK)
}

func (c *Controller) RemoveAccess(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := chi.URLParam(r, "dashboardId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	userId := chi.URLParam(r, "userId")
	if len(userId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong user id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.repo.RemoveAccessDashboard(id, userId)
	if err != nil {
		blogger.Errorf("[dashboards/RemoveAccess] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[RemoveAccess]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) UpdateAccess(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload AddAccessPayload

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

	err = c.repo.UpdateAccessDashboard(payload.DashboardId, payload.UserId, payload.Access)
	if err != nil {
		blogger.Errorf("[dashboards/UpdateAccess] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[UpdateAccess]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
