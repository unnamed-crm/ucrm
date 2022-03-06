package dashboards

import (
	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/auth"
)

func RegisterRouter(r chi.Router, controller *Controller) {
	r.Group(func(r chi.Router) {
		r.Use(auth.AuthGuard)
		r.Route("/dashboards", func(r chi.Router) {
			r.Post("/create", controller.CreateOne)
			r.Post("/addUser", controller.AddUserToDashboard)
		})
	})
}
