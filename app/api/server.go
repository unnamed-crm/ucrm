package api

import (
	"context"
	"log"
	"net/http"
	"sync"

	"github.com/go-chi/chi"
	"github.com/ignavan39/tm-go/app/config"
)

type Server struct {
	server *http.Server
	router chi.Router
}

func NewAPIServer(listenOn string, config config.Config) *Server {
	router := chi.NewRouter()

	return &Server{
		server: &http.Server{Addr: listenOn, Handler: router},
		router: router,
	}
}

func (s *Server) Router() chi.Router {
	return s.router
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
