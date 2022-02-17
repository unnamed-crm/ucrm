package dashboards

import (
	"errors"

	"github.com/ignavan39/tm-go/app/models"
)

type CreateDashboardPayload struct {
	Name string `json:"name"`
}

type CreateDashboardResponse struct {
	Dashboard models.Dashboard `json:"dashboard"`
}

type AddUserToDashboardPayload struct {
	DashboardId string `json:"dashboard_id"`
	Access      string `json:"access"`
	UserId      string `json:"user_id"`
}

func (p *AddUserToDashboardPayload) Validate() error {
	if p.Access != "r" || p.Access == "rw" {
		return errors.New("invalid access")
	}
	return nil
}

type AddUserToDashboardResponse struct {
	UserDashboardId string `json:"user_dashboard_id"`
}
