package api

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/middlewares"
)

func RegisterRouter(
	r chi.Router,
	controller *Controller,
	dashboardAccesGuard middlewares.DashboardAccessGuard,
	authGuard middlewares.AuthGuard,
) {
	r.Group(func(r chi.Router) {
		r.Use(authGuard.Next())
		r.Route("/dashboards", func(r chi.Router) {
			r.Get("/", controller.GetOneDashboardsByUser)
			r.Post("/create", controller.CreateOne)
			r.Group(func(r chi.Router) {
				r.Use(dashboardAccesGuard.Next("rw"))
				r.Post("/{dashboardId}/custom-field", controller.CreateCustomField)
			})
			r.Group(func(r chi.Router) {
				r.Use(dashboardAccesGuard.Next("r"))
				r.Get("/{dashboardId}", controller.GetOneDashboard)
			})
			r.Group(func(r chi.Router) {
				r.Use(dashboardAccesGuard.Next("admin"))
				r.Route("/admin", func(r chi.Router) {
					r.Patch("/{dashboardId}", controller.UpdateName)
					r.Delete("/{dashboardId}", controller.DeleteById)
					r.Post("/{dashboardId}/webhook", controller.AddWebhook)
					r.Post("/{dashboardId}/settings", controller.AddSettings)
					r.Delete("/removeAccess/{dashboardId}/{userId}", controller.RemoveAccess)
					r.Patch("/updateAccess", controller.UpdateAccess)
					r.Post("/addAccess", controller.AddAccess)
				})
			})
		})
	})
}
