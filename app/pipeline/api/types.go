package api

import "ucrm/app/models"

type CreateOnePayload struct {
	Name        string `json:"name"`
	DashboardId string `json:"dashboard_id"`
}

type CreatePipelineResponse struct {
	Pipeline models.Pipeline `json:"pipeline"`
}

type UpdateDashboardNamePayload struct {
	Name string `json:"name"`
}
