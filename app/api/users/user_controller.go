package users

import (
	"crypto/sha1"
	"encoding/json"
	// "fmt"
	"net/http"

	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/pkg/httpext"
)

type UserController struct {
	a *auth.Authorizer
}

func NewUserController(a *auth.Authorizer) *UserController {
	return &UserController{
		a: a,
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
	}

	pwd := sha1.New()
	pwd.Write([]byte(payload.Password))
	pwd.Write([]byte(c.a.GetHashSalt()))
	// password := fmt.Sprintf("%x", pwd.Sum(nil))
}
