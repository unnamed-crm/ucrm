package users

import "github.com/ignavan39/tm-go/app/models"

type SignPayload struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

type SignResponse struct {
	User  models.User `json:"user"`
	Token string      `json:"token"`
}
