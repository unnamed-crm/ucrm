package dashboards

import (
	"encoding/json"
	"net/http"

	"github.com/ignavan39/tm-go/app/database"
	"github.com/ignavan39/tm-go/pkg/httpext"
)

type DashboardController struct {
	dbService *database.DbService
}

func NewDashboardController(dbService *database.DbService) *DashboardController {
	return &DashboardController{dbService: dbService}
}

func (c *DashboardController) CreateOne(w http.ResponseWriter, r *http.Request){
	var payload CreateDashboardPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
}