package auth

import (
	"context"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
)

type Authorizer struct {
	hashSalt       string
	signingKey     []byte
	expireDuration time.Duration
}

func NewAuthorizer(hashSalt string, signingKey []byte, expireDuration time.Duration) *Authorizer {
	return &Authorizer{
		hashSalt:       hashSalt,
		signingKey:     signingKey,
		expireDuration: expireDuration,
	}
}

func (a *Authorizer) CreateToken(ctx context.Context, id string) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: jwt.At(time.Now().Add(a.expireDuration)),
			IssuedAt:  jwt.At(time.Now()),
		},
		Id: id,
	})

	return token.SignedString(a.signingKey)
}

func (a *Authorizer) GetHashSalt() string {
	return a.hashSalt
}
