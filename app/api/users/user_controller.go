package users

import (
	"context"
	"crypto/sha1"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	"net/http"

	sq "github.com/Masterminds/squirrel"

	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/models"
	"github.com/ignavan39/tm-go/pkg/httpext"
)

type UserController struct {
	auth *auth.Authorizer
	db   *sql.DB
}

func NewUserController(a *auth.Authorizer, db *sql.DB) *UserController {
	return &UserController{
		auth: a,
		db:   db,
	}
}

func (c *UserController) SignUp(w http.ResponseWriter, r *http.Request) {
	var payload SignUpPayload
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
	user := models.User{}

	row := sq.Insert("users").Columns("password", "email").
		Values(fmt.Sprintf("%x", pwd.Sum(nil)), payload.Email).
		Suffix("returning id,password,email,created_at").
		RunWith(c.db).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&user.Id, &user.Password, &user.Email, &user.CreatedAt); err != nil {
		if err != nil {
			log.Print(err)
			httpext.JSON(w, httpext.CommonError{
				Error: "user already exists",
				Code:  http.StatusBadRequest,
			}, http.StatusBadRequest)
		}
		return
	}

	ctx := context.WithValue(r.Context(), ContextUserKey, user.Id)
	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	_ = r.WithContext(ctx)

	httpext.JSON(w, SignUpResponse{
		User:  user,
		Token: accessToken,
	}, http.StatusCreated)
}
