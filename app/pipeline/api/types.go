package api

type CreateOnePayload struct {
	Name        string `json:"name"`
	DashboardId string `json:"dashboard_id"`
	Order       int    `json:"order"`
}

type UpdateOrder struct {
	OldOrder int `json:"old_order"`
}
