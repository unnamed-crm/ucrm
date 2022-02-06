package users

import "github.com/ignavan39/tm-go/app/models"

type SignUpPayload struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

type SignUpResponse struct {
	User  models.User `json:"user"`
	Token string      `json:"token"`
}

const ContextUserKey string = "user"
