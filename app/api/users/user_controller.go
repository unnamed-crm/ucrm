package users

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	blogger "github.com/sirupsen/logrus"

	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/core"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
	"github.com/ignavan39/ucrm-go/pkg/redis-cache"
	"github.com/ignavan39/ucrm-go/pkg/utils"
)

type Controller struct {
	auth       auth.Authorizer
	repo       repository.UserRepository
	mailer     core.Mailer
	mailConfig config.MailConfig
	cache      redisCache.RedisCache
}

func NewController(
	a auth.Authorizer,
	repo repository.UserRepository,
	mailer core.Mailer,
	mailConfig config.MailConfig,
	cache redisCache.RedisCache,
) *Controller {
	return &Controller{
		auth:       a,
		repo:       repo,
		mailer:     mailer,
		mailConfig: mailConfig,
		cache:      cache,
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

	ctx := r.Context()
	var code int
	err = c.cache.Get(ctx, fmt.Sprintf("%s_%s", cachePrefix(), payload.Email), &code)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong code",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if code != payload.Code {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong code",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	pwd := sha1.New()
	pwd.Write([]byte(payload.Password))
	pwd.Write([]byte(c.auth.GetHashSalt()))

	user, err := c.repo.AddUser(payload.Email, fmt.Sprintf("%x", pwd.Sum(nil)))
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: "user already exists",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

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

func (c *Controller) SendVerifyCode(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload VerifyCodePayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	code := utils.GenerateRandomNumber(10000, 99999)
	Data := make(map[string]string)
	Data["Code"] = fmt.Sprint(code)
	template, found := c.mailConfig.Letters["verification"]
	c.cache.SetWithExpiration(ctx, fmt.Sprintf("%s_%s", cachePrefix(), payload.Email), time.Minute*5, code)

	if !found {
		blogger.Error("verification template not found")
		httpext.JSON(w, httpext.CommonError{
			Error: "verification template not found",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	msg, err := utils.RenderTemplate(template.Template, utils.WrapTemplateData(Data))
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed render message",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	_, _, err = c.mailer.SendMail(msg, c.mailConfig.Sender, payload.Email)
	if err != nil {
		blogger.Errorf("CTX: %v, ERROR: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: "failed send message to email",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func cachePrefix() string {
	return "user_code"
}
