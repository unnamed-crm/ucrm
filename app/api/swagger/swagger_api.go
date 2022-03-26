package swagger

import (
	"github.com/go-chi/chi"
	httpSwagger "github.com/swaggo/http-swagger"
)

func RegisterRouter(r chi.Router) {
	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("cmd/app/docs/swagger.json"),
	))
}
