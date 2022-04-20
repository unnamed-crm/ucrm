package middlewares

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/dashboard"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type DashboardAccessGuard struct {
	repo dashboard.Repository
}

func NewDashboardAccessGuard(repo dashboard.Repository) *DashboardAccessGuard {
	return &DashboardAccessGuard{
		repo: repo,
	}
}

type DashboardAccessGuardPayload struct {
	DashboardId string `json:"dashboard_id"`
}

func (dag *DashboardAccessGuard) Next(accessType string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			id := chi.URLParam(r, "dashboardId")
			if len(id) == 0 {
				dashboardIdFromContext, ok := ctx.Value("dashboardId").(string)
				if ok || len(dashboardIdFromContext) != 0 {
					id = dashboardIdFromContext
				} else {
					var payload DashboardAccessGuardPayload

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

					id = payload.DashboardId
				}
			}

			if len(id) == 0 {
				httpext.JSON(w, httpext.CommonError{
					Error: "[DashboardAccessGuard]/wrong id",
					Code:  http.StatusBadRequest,
				}, http.StatusBadRequest)
				return
			}

			userId := auth.GetUserIdFromContext(ctx)
			dashboard, err := dag.repo.GetOneWithUserAccess(id, userId, accessType)
			if err != nil {
				httpext.JSON(w, httpext.CommonError{
					Error: err.Error(),
					Code:  http.StatusInternalServerError,
				}, http.StatusInternalServerError)
				return
			}

			for _, d := range dashboard.Users {
				if d.UserId == userId {
					next.ServeHTTP(w, r.WithContext(ctx))
					return
				}
			}

			w.WriteHeader(http.StatusForbidden)
			w.Write([]byte("Forbidden"))
		})
	}
}
