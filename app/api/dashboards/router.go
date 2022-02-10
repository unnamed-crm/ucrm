package dashboards

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/tm-go/app/auth"
)

func RegisterDashboardRouter(r chi.Router, controller *DashboardController) {
	r.Group(func(r chi.Router) {
		r.Use(auth.AuthGuard)
		r.Route("/dashboards", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
		})
	})
}
