package contact

type CreateOnePayload struct {
	DashboardId string  `json:"dashboard_id"`
	CardId      *string `json:"card_id,omitempty"`
	Name        string  `json:"name"`
	Phone       string  `json:"phone"`
	City        string  `json:"city"`
}
