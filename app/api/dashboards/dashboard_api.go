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
				r.Post("/addUser", controller.AddUserToDashboard)
			})
			r.Get("/{id}", controller.GetOneDashboard)
		})
	})
}
