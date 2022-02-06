package api

import (
	"context"
	"database/sql"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ignavan39/tm-go/app/api/users"
	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/config"
)

type Server struct {
	server *http.Server
	router chi.Router
}

func NewAPIServer(listenOn string, config config.Config, conn *sql.DB) *Server {
	router := chi.NewRouter()

	authorizer := auth.NewAuthorizer(config.JWT.HashSalt, []byte(config.JWT.SingingKey), config.JWT.ExpireDuration)
	userController := users.NewUserController(authorizer, conn)
	users.RegisterUserRouter(router, *userController)

	return &Server{
		server: &http.Server{Addr: listenOn, Handler: router},
		router: router,
	}
}

func (a *Server) Stop() {
	a.server.Shutdown(context.Background())
}

func (a *Server) Start() error {
	if err := a.server.ListenAndServe(); err != nil {
		log.Fatal("Error")
	}
	return nil
}
