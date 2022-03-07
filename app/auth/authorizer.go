package auth

import (
	"context"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
)

type Authorizer interface {
	CreateToken(ctx context.Context, id string) (string, error)
	GetHashSalt() string
}

type AuthorizerJWT struct {
	hashSalt       string
	signingKey     []byte
	expireDuration time.Duration
}

func NewAuthorizer(hashSalt string, signingKey []byte, expireDuration time.Duration) *AuthorizerJWT {
	return &AuthorizerJWT{
		hashSalt:       hashSalt,
		signingKey:     signingKey,
		expireDuration: expireDuration,
	}
}

func (a *AuthorizerJWT) CreateToken(ctx context.Context, id string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: jwt.At(time.Now().Add(a.expireDuration)),
			IssuedAt:  jwt.At(time.Now()),
		},
		Id: id,
	})

	return token.SignedString(a.signingKey)
}

func (a *AuthorizerJWT) GetHashSalt() string {
	return a.hashSalt
}
