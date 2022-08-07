package api

import (
	"github.com/go-chi/chi"
	"ucrm/app/middlewares"
)

func RegisterRouter(r chi.Router, controller *Controller, authGuard middlewares.AuthGuard) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/cards", func(r chi.Router) {
			r.Route("/tags", func(r chi.Router) {
				r.Post("/create/{cardId}", controller.CreateTag)
				r.Post("/attach/{cardId}/{tagId}", controller.AttachTag)
				r.Delete("/{tagId}", controller.DeleteTag)
				r.Delete("/detach/{cardId}/{tagId}", controller.DetachTag)
			})
			r.Post("/create", controller.CreateOne)
			r.Delete("/{cardId}", controller.Delete)
			r.Get("/{cardId}", controller.GetOne)
			r.Patch("/{cardId}", controller.Update)
			r.Patch("/order/{cardId}/{order}", controller.UpdateOrder)
		})
	})
}
