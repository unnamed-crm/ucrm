package api

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/middlewares"
)

func RegisterRouter(
	r chi.Router,
	controller *Controller,
	authGuard middlewares.AuthGuard,
	pipelineAccessGuard middlewares.PipelineAccessGuard,
	dashboardAccessGuard middlewares.DashboardAccessGuard,
) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/pipelines", func(r chi.Router) {
			r.Group(func(r chi.Router) {
				r.Use(dashboardAccessGuard.Next("rw"))
				r.Patch("/order/{dashboardId}/{pipelineId}/{order}", controller.UpdateOrder)
				r.Post("/create", controller.CreateOne)
			})
			r.Group(func(r chi.Router) {
				r.Use(pipelineAccessGuard.Next("rw"))
				r.Patch("/{pipelineId}", controller.UpdateName)
				r.Delete("/{pipelineId}", controller.DeleteById)
			})
		})
	})
}
