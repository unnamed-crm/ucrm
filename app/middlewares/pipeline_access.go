package middlewares

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/go-chi/chi"
	"ucrm/app/auth"
	"ucrm/app/pipeline"
	"ucrm/pkg/httpext"
)

type PipelineAccessGuard struct {
	repo pipeline.Repository
}

func NewPipelineAccessGuard(repo pipeline.Repository) *PipelineAccessGuard {
	return &PipelineAccessGuard{
		repo: repo,
	}
}

type PipelineAccessGuardPayload struct {
	PipelineId string `json:"pipeline_id"`
}

func (pag *PipelineAccessGuard) Next(accessType string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()

			id := chi.URLParam(r, "pipelineId")
			if len(id) == 0 {
				var payload PipelineAccessGuardPayload

				body, err := ioutil.ReadAll(r.Body)
				if err != nil {
					httpext.JSON(w, httpext.CommonError{
						Error: "failed decode payload",
						Code:  http.StatusBadRequest,
					}, http.StatusBadRequest)
					return
				}

				reader := ioutil.NopCloser(bytes.NewReader(body))
				r.Body = reader

				err = json.Unmarshal(body, &payload)
				if err != nil {
					httpext.JSON(w, httpext.CommonError{
						Error: "failed decode payload",
						Code:  http.StatusBadRequest,
					}, http.StatusBadRequest)
					return
				}

				id = payload.PipelineId
			}

			if len(id) == 0 {
				httpext.JSON(w, httpext.CommonError{
					Error: "[PipelineAccessGuard]/wrong id",
					Code:  http.StatusBadRequest,
				}, http.StatusBadRequest)
				return
			}

			userId := auth.GetUserIdFromContext(ctx)
			ok, err := pag.repo.GetAccessById(id, userId, accessType)
			if err != nil {
				httpext.JSON(w, httpext.CommonError{
					Error: err.Error(),
					Code:  http.StatusInternalServerError,
				}, http.StatusInternalServerError)
				return
			}

			if ok {
				next.ServeHTTP(w, r.WithContext(ctx))
				return
			}

			w.WriteHeader(http.StatusForbidden)
			w.Write([]byte("Forbidden"))
		})
	}
}
