package dashboards

import (
	"errors"

	"github.com/ignavan39/ucrm-go/app/models"
)

type CreateDashboardPayload struct {
	Name string `json:"name"`
}

type CreateDashboardResponse struct {
	Dashboard models.Dashboard `json:"dashboard"`
}

type AddAccessPayload struct {
	DashboardId string `json:"dashboard_id"`
	Access      string `json:"access"`
	UserId      string `json:"user_id"`
}

func (p *AddAccessPayload) Validate() error {
	if p.Access != "r" && p.Access != "rw" {
		return errors.New("invalid access")
	}
	return nil
}

type AddWebhookPayload struct {
	Url  string  `json:"url"`
	Name *string `json:"name,omitempty"`
}

type UpdateNamePayload struct {
	Name string `json:"name"`
}

type AddSettingsPayload struct {
	Secret string `json:"secret"`
}

type AddCustomField struct {
	Name       string `json:"name"`
	IsNullable bool   `json:"is_nullable"`
}

func (p *AddCustomField) Validate() error {
	if len(p.Name) == 0 {
		return errors.New("Incorrect params for custom field add")
	}

	return nil
}
