package middlewares

import (
	"bytes"
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/go-chi/chi"
	"ucrm/app/dashboard"
	"ucrm/pkg/httpext"
)

type CustomFieldGuard struct {
	repo dashboard.Repository
}

func NewCustomFieldGuard(repo dashboard.Repository) *CustomFieldGuard {
	return &CustomFieldGuard{
		repo: repo,
	}
}

type CustomFieldGuardPayload struct {
	FieldId string `json:"field_id"`
}

func (cfg *CustomFieldGuard) Next() func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			fieldId := chi.URLParam(r, "fieldId")

			if len(fieldId) == 0 {
				var payload CustomFieldGuardPayload
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

				fieldId = payload.FieldId
			}

			if len(fieldId) == 0 {
				httpext.JSON(w, httpext.CommonError{
					Error: "[AccessGuard]/wrong field id",
					Code:  http.StatusBadRequest,
				}, http.StatusBadRequest)
				return
			}

			dashboardId, err := cfg.repo.GetDashboardIdByFieldId(fieldId)
			if err != nil || dashboardId == nil {
				httpext.JSON(w, httpext.CommonError{
					Error: "[AccessGuard]/wrong field id",
					Code:  http.StatusBadRequest,
				}, http.StatusBadRequest)
				return
			}

			newCtx := context.WithValue(ctx, "dashboardId", *dashboardId)
			next.ServeHTTP(w, r.WithContext(newCtx))
			return
		})
	}
}
