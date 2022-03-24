package dashboards

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/middlewares"
	"github.com/ignavan39/ucrm-go/app/repository"
)

func RegisterRouter(r chi.Router, controller *Controller, repo repository.DashboardRepository, config config.JWTConfig) {
	r.Group(func(r chi.Router) {
		r.Use(middlewares.AuthGuard(config))
		r.Route("/dashboards", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
			r.Group(func(r chi.Router) {
				r.Use(middlewares.DashboardAccessGuard(repo, "rw"))
				r.Post("/{dashboardId}/custom-field", controller.CreateCustomField)
			})
			r.Group(func(r chi.Router) {
				r.Use(middlewares.DashboardAccessGuard(repo, "r"))
				r.Get("/{dashboardId}", controller.GetOneDashboard)
			})
			r.Group(func(r chi.Router) {
				r.Use(middlewares.IsAdminGuard(repo))
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
