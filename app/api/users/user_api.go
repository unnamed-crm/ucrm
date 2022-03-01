package users

import "github.com/go-chi/chi"

func RegisterUserRouter(r chi.Router, controller *UserController) {
	r.Group(func(r chi.Router) {
		r.Route("/users", func(r chi.Router) {
			r.Post("/sign-up", controller.SignUp)
			r.Post("/sign-in", controller.SignIn)
		})

	})
}
