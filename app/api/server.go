package api

import (
	"context"
	"net/http"
	"sync"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/rs/cors"

	blogger "github.com/sirupsen/logrus"
)

type Server struct {
	server *http.Server
	router chi.Router
}

func NewAPIServer(listenOn string) *Server {
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

func (a *Server) Start() {
	var httpServerError = make(chan error)
	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		defer wg.Done()
		httpServerError <- a.server.ListenAndServe()
	}()

	select {
	case <-httpServerError:
		blogger.Fatal("The Logging API service could not be started.", <-httpServerError)
	default:
		blogger.Info("Server has been started...")
	}
	wg.Wait()
}
