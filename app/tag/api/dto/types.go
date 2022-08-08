package dto

import (
	"errors"
	"ucrm/app/models"
)

type CreateTagPayload struct {
	DashboardId string  `json:"dashboard_id"`
	Text        string  `json:"text"`
	Description *string `json:"description,omitempty"`
	Color       string  `json:"color"`
}

func (p *CreateTagPayload) Validate() error {
	if len(p.Text) == 0 {
		return errors.New("incorrect params for tag create")
	}

	return nil
}

type CreateTagResponse = models.Tag

type UpdateTagPayload struct {
	Text        *string `json:"text"`
	Description *string `json:"description"`
	Color       *string `json:"color"`
}

func (p *UpdateTagPayload) Validate() error {
	if (p.Text == nil || len(*p.Text) == 0) &&
		(p.Description == nil || len(*p.Description) == 0) &&
		(p.Color == nil || len(*p.Color) == 0) {
		return errors.New("incorrect params for tag update")
	}

	return nil
}

type UpdateTagResponse = models.Tag
