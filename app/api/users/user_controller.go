package users

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"log"

	"net/http"

	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	auth *auth.Authorizer
	repo repository.UserRepository
}

func NewController(a *auth.Authorizer, repo repository.UserRepository) *Controller {
	return &Controller{
		auth: a,
		repo: repo,
	}
}

func (c *Controller) SignUp(w http.ResponseWriter, r *http.Request) {
	var payload SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Password) < 5 {
		httpext.JSON(w, httpext.CommonError{
			Error: "password too short",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pwd := sha1.New()
	pwd.Write([]byte(payload.Password))
	pwd.Write([]byte(c.auth.GetHashSalt()))
	user, err := c.repo.AddUser(payload.Email, fmt.Sprintf("%x", pwd.Sum(nil)))
	if err != nil {
		log.Print(err)
		httpext.JSON(w, httpext.CommonError{
			Error: "user already exists",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, SignResponse{
		User:  *user,
		Token: accessToken,
	}, http.StatusCreated)
}

func (c *Controller) SignIn(w http.ResponseWriter, r *http.Request) {
	var payload SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pwd := sha1.New()
	pwd.Write([]byte(payload.Password))
	pwd.Write([]byte(c.auth.GetHashSalt()))

	user, err := c.repo.GetOneUserByEmail(payload.Email, fmt.Sprintf("%x", pwd.Sum(nil)))
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	if user == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "user not found",
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}
	ctx := r.Context()
	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, SignResponse{
		User:  *user,
		Token: accessToken,
	}, http.StatusCreated)

}
