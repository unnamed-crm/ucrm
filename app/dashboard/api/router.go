package api

import (
	"github.com/go-chi/chi"
	"ucrm/app/middlewares"
)

func RegisterRouter(
	r chi.Router,
	controller *Controller,
	dashboardAccesGuard middlewares.DashboardAccessGuard,
	customFieldGuard middlewares.CustomFieldGuard,
	authGuard middlewares.AuthGuard,
) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/dashboards", func(r chi.Router) {
			r.Get("/", controller.GetByUser)
			r.Post("/create", controller.CreateOne)
			r.Group(func(r chi.Router) {
				r.Use(dashboardAccesGuard.Next("rw"))
				r.Post("/{dashboardId}/custom-field", controller.CreateCustomField)
			})
			r.Group(func(r chi.Router) {
				r.Use(dashboardAccesGuard.Next("r"))
				r.Get("/{dashboardId}", controller.GetOneDashboard)
			})
			r.Route("/admin", func(r chi.Router) {
				r.Group(func(r chi.Router) {
					r.Use(dashboardAccesGuard.Next("admin"))
					r.Patch("/{dashboardId}", controller.UpdateName)
					r.Delete("/{dashboardId}", controller.DeleteById)
					r.Post("/{dashboardId}/webhook", controller.AddWebhook)
					r.Post("/{dashboardId}/settings", controller.AddSettings)
					r.Delete("/removeAccess/{dashboardId}/{userId}", controller.RemoveAccess)
					r.Patch("/updateAccess", controller.UpdateAccess)
					r.Post("/addAccess", controller.AddAccess)
				})
				r.Group(func(r chi.Router) {
					r.Use(customFieldGuard.Next())
					r.Use(dashboardAccesGuard.Next("admin"))
					r.Delete("/custom-field/{fieldId}", controller.DeleteCustomField)
				})
			})

		})
	})
}
