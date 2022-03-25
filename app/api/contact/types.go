package contact

import "errors"

type CreateOnePayload struct {
	DashboardId string  `json:"dashboard_id"`
	CardId      *string `json:"card_id,omitempty"`
	Name        string  `json:"name"`
	Phone       string  `json:"phone"`
	City        string  `json:"city"`
}

type UpdatePayload struct {
	Name   *string            `json:"name,omitempty"`
	Phone  *string            `json:"phone,omitempty"`
	City   *string            `json:"city,omitempty"`
	Fields *map[string]string `json:"fields,omitempty"`
}

func (p *UpdatePayload) Validate() error {
	if (p.Name == nil || len(*p.Name) == 0) &&
		(p.Phone == nil || len(*p.Phone) == 0) &&
		(p.City == nil || len(*p.City) == 0) &&
		p.Fields == nil {
		return errors.New("Incorrect params for update")
	}

	return nil
}
