package cards

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/middlewares"
	"github.com/ignavan39/ucrm-go/app/repository"
)

func RegisterRouter(r chi.Router, controller *Controller, repo repository.PipelineRepository, config config.JWTConfig) {
	r.Group(func(r chi.Router) {
		r.Use(middlewares.AuthGuard(config))
		r.Route("/cards", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
			r.Delete("/{cardId}", controller.Delete)
			r.Get("/{cardId}", controller.GetOne)
			r.Patch("/{cardId}", controller.Update)
			r.Patch("/order/{pipelineId}/{cardId}/{order}", controller.UpdateOrder)
			r.Post("/custom-field/{dashboardId}/{cardId}", controller.createCustomField)
		})
	})
}
