package auth

import (
	"github.com/dgrijalva/jwt-go/v4"
)

type Claims struct {
	jwt.StandardClaims
	Id string `json:"id"`
}

const ContextUserKey string = "user"
