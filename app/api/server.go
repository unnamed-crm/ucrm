package api

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"sync"

	"github.com/go-chi/chi"
	"github.com/ignavan39/tm-go/app/api/users"
	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/config"
	"github.com/ignavan39/tm-go/app/repo"
)

type Server struct {
	server *http.Server
	router chi.Router
}

func NewAPIServer(listenOn string, config config.Config, conn *sql.DB) *Server {
	router := chi.NewRouter()

	repository := repo.NewRepository(conn)
	authorizer := auth.NewAuthorizer(config.JWT.HashSalt, []byte(config.JWT.SingingKey), config.JWT.ExpireDuration)
	userController := users.NewUserController(authorizer, *repository)
	users.RegisterUserRouter(router, *userController)

	return &Server{
		server: &http.Server{Addr: listenOn, Handler: router},
		router: router,
	}
}

func (a *Server) Stop() {
	a.server.Shutdown(context.Background())
}

func (a *Server) Start() {
	var httpServerError = make(chan error)
    var wg sync.WaitGroup

    wg.Add(1)
    go func() {
        defer wg.Done()
        httpServerError <- a.server.ListenAndServe()
    }()

    if <-httpServerError != nil {
        log.Fatal("The Logging API service could not be started.", <-httpServerError)
    } else {
		log.Println("Server has been started...")
    }

    wg.Wait()
}
