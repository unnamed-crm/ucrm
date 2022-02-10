package dashboards

import "github.com/ignavan39/tm-go/app/models"

type CreateDashboardPayload struct {
	Name string `json:"name"`
}

type CreateDashboardResponse struct {
	Dashboard models.Dashboard `json:"dashboard"`
}