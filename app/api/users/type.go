package users

import "github.com/ignavan39/ucrm-go/app/models"

type SignPayload struct {
	Password string `json:"password"`
	Email    string `json:"email"`
	Code     int    `json:"code"`
}

type SignResponse struct {
	User  models.User `json:"user"`
	Token string      `json:"token"`
}
type VerifyCodePayload struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

type SendVerifyCodePayload struct {
	Email string `json:"email"`
}
