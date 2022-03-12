package middlewares

import (
	"context"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/config"

	blogger "github.com/sirupsen/logrus"
)

func AuthGuard(cfg config.JWTConfig) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
			if len(authHeader) != 2 {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Malformed Token"))
				return
			} else {
				jwtToken := authHeader[1]
				customClaims := &auth.Claims{}
				token, err := jwt.ParseWithClaims(jwtToken, customClaims, func(token *jwt.Token) (interface{}, error) {
					return []byte(cfg.SigningKey), nil
				})
				if err != nil || !token.Valid {
					blogger.Error("[AuthGuard] Error :%s", err.Error())
					w.WriteHeader(http.StatusUnauthorized)
					w.Write([]byte("Unauthorized"))
					return
				}

				ctx := context.WithValue(r.Context(), auth.ContextUserKey, customClaims.Id)
				next.ServeHTTP(w, r.WithContext(ctx))
			}
		})
	}
}
