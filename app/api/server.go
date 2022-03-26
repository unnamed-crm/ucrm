package api

import (
	"context"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/rs/cors"
)

type Server struct {
	server *http.Server
	router chi.Router
	done   chan error
}

func NewAPIServer(listenOn string) *Server {
	router := chi.NewRouter()

	return &Server{
		server: &http.Server{Addr: listenOn, Handler: router},
		router: router,
		done: make(chan error),
	}
}

func (s *Server) Router() chi.Router {
	return s.router
}

func (a *Server) Stop() {
	a.server.Shutdown(context.Background())
}

func (a *Server) WithCors(corsConfig config.CorsConfig) *Server {
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:     corsConfig.AllowedOrigins,
		AllowedMethods:     corsConfig.AllowedMethods,
		AllowedHeaders:     corsConfig.AllowedHeaders,
		ExposedHeaders:     corsConfig.ExposedHeaders,
		MaxAge:             corsConfig.MaxAge,
		AllowCredentials:   corsConfig.AllowCredentials,
		OptionsPassthrough: corsConfig.OptionsPassthrough,
		Debug:              corsConfig.DebugCors,
	})
	if corsConfig.UseAllowAllHandler {
		corsHandler = cors.AllowAll()
	}
	a.router.Use(corsHandler.Handler)
	return a
}

func (a *Server) Start() error {
	go func() {
		defer close(a.done)
		if err := a.server.ListenAndServe();err != nil {
			a.done <- err
		}
	}()
	return nil
}

func (a *Server) WaitForDone () error {
	return <-a.done
}
