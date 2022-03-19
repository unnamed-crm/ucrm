package connect

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/middlewares"
)

func RegisterRouter(r chi.Router, controller *Controller, config config.JWTConfig) {
	r.Group(func(r chi.Router) {
		r.Use(middlewares.AuthGuard(config))
		r.Route("/connect", func(r chi.Router) {
			r.Post("/create", controller.CreateQueue)
			r.Post("/subscribe", controller.Subscribe)
			r.Post("/unsubscribe", controller.Unsubscribe)
		})
	})
}
