package contact

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/middlewares"
	"github.com/ignavan39/ucrm-go/app/repository"
)

func RegisterRouter(r chi.Router, controller *Controller, repo repository.ContactRepository, config config.JWTConfig) {
	r.Group(func(r chi.Router) {
		r.Use(middlewares.AuthGuard(config))
		r.Route("/contact", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
			r.Delete("/{contactId}", controller.Delete)
			r.Get("/{contactId}", controller.GetOne)
			r.Patch("/{contactId}/{newName}", controller.Rename)
			r.Patch("/{contactId}", controller.Update)
		})
	})
}
