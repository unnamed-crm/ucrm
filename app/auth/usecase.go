package auth

import (
	"context"

	"github.com/dgrijalva/jwt-go/v4"
)

type Claims struct {
	jwt.StandardClaims
	Id string `json:"id"`
}

type ContextUseType = string

const ContextUserKey ContextUseType = "user"

func GetUserIdFromContext(ctx context.Context) string {
	userId, ok := ctx.Value(ContextUserKey).(string)
	if !ok {
		return ""
	}

	return userId
}

type UseCase interface {
	CreateToken(ctx context.Context, id string) (string, error)
	GetHashSalt() string
}
