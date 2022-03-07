package pipelines

type CreateOnePayload struct {
	Name        string `json:"name"`
	DashboardId string `json:"dashboard_id"`
	Order 		int    `json:"order"`
}
