package api

import "ucrm/app/models"

type SignPayload struct {
	Password string `json:"password"`
	Email    string `json:"email"`
	Code     int    `json:"code"`
}

type SignResponse struct {
	User  models.User `json:"user"`
	Token string      `json:"token"`
}

type SendCodePayload struct {
	Email string `json:"email"`
}
