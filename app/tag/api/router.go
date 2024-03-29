package api

import (
	"ucrm/app/middlewares"

	"github.com/go-chi/chi"
)

func RegisterRouter(r chi.Router, controller *Controller, authGuard middlewares.AuthGuard) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/tags", func(r chi.Router) {
			r.Post("/create", controller.CreateTag)
			r.Post("/create/{cardId}", controller.CreateAndAttachTag)
			r.Post("/attach/{cardId}/{tagId}", controller.AttachTag)
			r.Delete("/{tagId}", controller.DeleteTag)
			r.Post("/detach/{cardId}/{tagId}", controller.DetachTag)
			r.Patch("/{tagId}", controller.UpdateTag)
		})
	})
}
