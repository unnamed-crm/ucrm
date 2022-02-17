package users

import (
	"context"
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"log"

	"net/http"

	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/database"
	"github.com/ignavan39/tm-go/pkg/httpext"
)

type UserController struct {
	auth      *auth.Authorizer
	dbService database.DbService
}

func NewController(a *auth.Authorizer, dbService database.DbService) *UserController {
	return &UserController{
		auth:      a,
		dbService: dbService,
	}
}

func (c *UserController) SignUp(w http.ResponseWriter, r *http.Request) {
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
	user, err := c.dbService.AddUser(payload.Email, fmt.Sprintf("%x", pwd.Sum(nil)))
	if err != nil {
		log.Print(err)
		httpext.JSON(w, httpext.CommonError{
			Error: "user already exists",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	ctx := context.WithValue(r.Context(), auth.ContextUserKey, user.Id)
	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	_ = r.WithContext(ctx)

	httpext.JSON(w, SignResponse{
		User:  *user,
		Token: accessToken,
	}, http.StatusCreated)
}

func (c *UserController) SignIn(w http.ResponseWriter, r *http.Request) {
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

	user, err := c.dbService.GetOneUserByEmail(payload.Email, fmt.Sprintf("%x", pwd.Sum(nil)))
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
	ctx := context.WithValue(r.Context(), auth.ContextUserKey, user.Id)
	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	_ = r.WithContext(ctx)

	httpext.JSON(w, SignResponse{
		User:  *user,
		Token: accessToken,
	}, http.StatusCreated)

}
