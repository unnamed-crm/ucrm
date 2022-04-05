package api

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/middlewares"
)

func RegisterRouter(r chi.Router, controller *Controller, authGuard middlewares.AuthGuard) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/connect", func(r chi.Router) {
			r.Post("/create", controller.CreateQueue)
			r.Post("/unsubscribe", controller.Unsubscribe)
			r.Post("/ping", controller.Ping)
		})
	})
}
