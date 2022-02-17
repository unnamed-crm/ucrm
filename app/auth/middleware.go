package auth

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/ignavan39/tm-go/app/config"
)

func AuthGuard(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		config, _ := config.GetConfig()
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		if len(authHeader) != 2 {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Malformed Token"))
		} else {
			jwtToken := authHeader[1]
			customClaims := &Claims{}
			token, err := jwt.ParseWithClaims(jwtToken, customClaims, func(token *jwt.Token) (interface{}, error) {
				return []byte(config.JWT.SingingKey), nil
			})
			if err != nil || !token.Valid {
				log.Println(err)
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Unauthorized"))
			}

			ctx := context.WithValue(r.Context(), ContextUserKey, customClaims.Id)
			next.ServeHTTP(w, r.WithContext(ctx))
		}
	})
}
