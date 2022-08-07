package api

import (
	"github.com/go-chi/chi"
	"ucrm/app/middlewares"
)

func RegisterRouter(r chi.Router, controller *Controller, authGuard middlewares.AuthGuard) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/cards", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
			r.Post("/createTag/{cardID}", controller.CreateTag)
			r.Delete("/deleteTag/{cardID}", controller.DeleteTag)
			r.Delete("/{cardId}", controller.Delete)
			r.Get("/{cardId}", controller.GetOne)
			r.Patch("/{cardId}", controller.Update)
			r.Patch("/order/{cardId}/{order}", controller.UpdateOrder)
		})
	})
}
