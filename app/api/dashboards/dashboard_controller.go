package dashboards

import (
	"encoding/json"
	"net/http"

	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/database"
	"github.com/ignavan39/tm-go/pkg/httpext"
)

type DashboardController struct {
	dbService *database.DbService
}

func NewDashboardController(dbService *database.DbService) *DashboardController {
	return &DashboardController{dbService: dbService}
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
	dashboard, err := c.dbService.AddDashboard(payload.Name, userId)
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
