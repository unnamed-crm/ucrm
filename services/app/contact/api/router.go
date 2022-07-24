package api

import (
	"github.com/go-chi/chi"
	"ucrm/app/middlewares"
)

func RegisterRouter(r chi.Router, controller *Controller, authGuard middlewares.AuthGuard) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/contacts", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
			r.Delete("/{contactId}", controller.Delete)
			r.Get("/{contactId}", controller.GetOne)
			r.Patch("/{contactId}/{newName}", controller.Rename)
			r.Patch("/{contactId}", controller.Update)
		})
	})
}
