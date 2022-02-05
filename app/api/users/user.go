package users

import "github.com/go-chi/chi"

func RegisterUserRouter(r chi.Router, controller UserController) {
	r.Group(func(r chi.Router) {
		r.Post("/users/sing-up", controller.SignUp)
	})
}
