package dashboards

import "github.com/go-chi/chi"

func RegisterDashboardRouter(r chi.Router, controller *DashboardController) {
	r.Group(func(r chi.Router) {
		r.Route("/dashboards", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
		})

	})
}
