package api

import (
	"errors"
	"strings"
	"time"

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

type GetOneDashboardFields struct {
	Contacts []models.Field `json:"contacts"`
	Cards    []models.Field `json:"card"`
}

type GetOneDashboardResponse struct {
	Id        string                `json:"id"`
	UpdatedAt time.Time             `json:"updated_at"`
	Name      string                `json:"name"`
	AuthorId  string                `json:"author_id"`
	Pipelines []models.Pipeline     `json:"pipelines"`
	Fields    GetOneDashboardFields `json:"fields"`
}

var Access = []string{"rw", "admin", "r"}

func (p *AddAccessPayload) Validate() error {
	for _, a := range Access {
		if a == p.Access {
			return nil
		}
	}
	return errors.New("invalid access")
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
	FieldType  string `json:"field_type"`
}

const (
	FIELD_TYPE_CONTACT = "contact"
	FIELD_TYPE_CARD    = "card"
)

func (p *AddCustomField) Validate() error {
	if len(p.Name) == 0 {
		return errors.New("incorrect params for custom field add")
	}

	p.FieldType = strings.ToLower(p.FieldType)
	if p.FieldType != FIELD_TYPE_CARD && p.FieldType != FIELD_TYPE_CONTACT {
		return errors.New("incorrect value for type")
	}

	return nil
}

const (
	FIELD_TYPE_CONTACT = "contact"
	FIELD_TYPE_CARD    = "card"
)
