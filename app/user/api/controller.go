package api

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	blogger "github.com/sirupsen/logrus"

	"ucrm/app/auth"
	"ucrm/app/config"
	"ucrm/app/user"

	redisCache "github.com/ignavan39/go-pkgs/cache/redis"
	"github.com/ignavan39/go-pkgs/httpext"
	"github.com/ignavan39/go-pkgs/utils"
	internalUtils "ucrm/pkg/utils"
)

type Controller struct {
	auth       auth.AuthUseCase
	repo       user.Repository
	mailConfig config.MailConfig
	//TODO string and int different caches
	cache      redisCache.RedisCache[any]
}

func NewController(
	a auth.AuthUseCase,
	repo user.Repository,
	mailConfig config.MailConfig,
	cache redisCache.RedisCache[any],
) *Controller {
	return &Controller{
		auth:       a,
		repo:       repo,
		mailConfig: mailConfig,
		cache:      cache,
	}
}

// SignUp    godoc
// @Summary  Sign-up
// @Tags     users
// @Accept   json
// @Success  201  {object}  SignResponse
// @Failure  400  {object}  httpext.CommonError
// @Failure  401  {object}  httpext.CommonError
// @Failure  500  {object}  httpext.CommonError
// @Router   /users/signUp [post]
func (c *Controller) SignUp(w http.ResponseWriter, r *http.Request) {
	var payload SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Password) < 5 {
		httpext.JSON(w, httpext.CommonError{
			Error: "password too short",
		}, http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	code,err := c.cache.Get(ctx, fmt.Sprintf("%s_%s", cachePrefix(), payload.Email))

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong code",
		}, http.StatusBadRequest)
		return
	}

	if *code != payload.Code {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong code",
		}, http.StatusBadRequest)
		return
	}

	user, err := c.repo.Create(payload.Email, utils.CryptString(payload.Password, c.auth.GetHashSalt()))
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: "user already exists",
		}, http.StatusBadRequest)
		return
	}

	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
		}, http.StatusInternalServerError)
		return
	}

	response := SignResponse{*user, accessToken}
	httpext.JSON(w, response, http.StatusCreated)
}

// SignIn    godoc
// @Summary  Sign-in
// @Tags     users
// @Accept   json
// @Param    payload  body      SignPayload  true  " "
// @Success  200      {object}  SignResponse
// @Failure  400  {object}  httpext.CommonError
// @Failure  401  {object}  httpext.CommonError
// @Failure  500  {object}  httpext.CommonError
// @Router   /users/signIn [post]
func (c *Controller) SignIn(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload SignPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	user, err := c.repo.GetOneByEmail(payload.Email, utils.CryptString(payload.Password, c.auth.GetHashSalt()))
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if user == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "user not found",
		}, http.StatusNotFound)
		return
	}

	accessToken, err := c.auth.CreateToken(ctx, user.Id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed created access token",
		}, http.StatusInternalServerError)
		return
	}

	response := SignResponse{*user, accessToken}
	httpext.JSON(w, response, http.StatusOK)
}

// SendVerifyCode    godoc
// @Summary  Send verification code
// @Tags     users
// @Accept   json
// @Param    payload  body  SendCodePayload  true  " "
// @Success  200
// @Failure  400      {object}  httpext.CommonError
// @Failure  401      {object}  httpext.CommonError
// @Failure  500      {object}  httpext.CommonError
// @Router   /users/sendVerifyCode [post]
func (c *Controller) SendVerifyCode(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload SendCodePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	err = c.sendMailMessage(ctx, cachePrefix(), "verification", time.Minute*5, payload.Email)
	if err != nil {
		if errors.Is(err, errTooFrequentCodeEntry) {
			httpext.JSON(w, httpext.CommonError{
				Error: err.Error(),
			}, http.StatusBadRequest)
			return
		} else {
			httpext.JSON(w, httpext.CommonError{
				Error: err.Error(),
			}, http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}

func (c *Controller) RecoveryPassword(w http.ResponseWriter, r *http.Request) {
	var payload SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Password) < 5 {
		httpext.JSON(w, httpext.CommonError{
			Error: "password too short",
		}, http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	code,err := c.cache.Get(ctx, fmt.Sprintf("%s_%s", cachePrefix(), payload.Email))

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong code",
		}, http.StatusBadRequest)
		return
	}

	if *code != payload.Code {
		httpext.JSON(w, httpext.CommonError{
			Error: "wrong code",
		}, http.StatusBadRequest)
		return
	}

	user, err := c.repo.UpdatePassword(payload.Email, utils.CryptString(payload.Password, c.auth.GetHashSalt()))
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: "user already exists",
		}, http.StatusBadRequest)
		return
	}

	httpext.JSON(w, user, http.StatusOK)
}

func (c *Controller) SendRecoveryCode(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload SendCodePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	err = c.sendMailMessage(ctx, cachePrefix(), "recovery-password", time.Minute*5, payload.Email)
	if err != nil {
		if errors.Is(err, errTooFrequentCodeEntry) {
			httpext.JSON(w, httpext.CommonError{
				Error: err.Error(),
			}, http.StatusBadRequest)
			return
		} else {
			httpext.JSON(w, httpext.CommonError{
				Error: err.Error(),
			}, http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) sendMailMessage(
	ctx context.Context,
	cachePrefix string,
	templateKey string,
	expireTime time.Duration,
	email string,
) error {

	lastTimeRaw,err := c.cache.Get(ctx, fmt.Sprintf("%s_%s", retryPeriodPrefix(), email))
	if err == nil {
		lastTime, err := time.Parse(time.RFC3339, (*lastTimeRaw).(string))
		if err != nil {
			blogger.Errorf("[user/sendMailMessage]: ctx: %v, error: %s", ctx, err.Error())
			return errFailedParseTime
		}
		if !time.Now().Add(time.Duration(-5) * time.Minute).After(lastTime) {
			return errTooFrequentCodeEntry
		}
	}

	err = c.cache.Set(ctx,
		fmt.Sprintf("%s_%s", retryPeriodPrefix(), email),
		time.Now().Format(time.RFC3339))
	if err != nil {
		blogger.Errorf("[user/sendMailMessage]: ctx: %v, error: %s", ctx, err.Error())
		return errFailedSaveLastTimeToCache
	}

	code := utils.GenerateRandomNumber(10000, 99999)
	Data := make(map[string]string)
	Data["Code"] = fmt.Sprint(code)
	template, found := c.mailConfig.Letters[templateKey]
	c.cache.Set(ctx, fmt.Sprintf("%s_%s", cachePrefix, email), code)

	if !found {
		return errTemplateNotFound
	}

	msg, err := internalUtils.RenderTemplate(template.Template, internalUtils.WrapTemplateData(Data))
	if err != nil {
		blogger.Errorf("[user/sendMailMessage]: ctx: %v, error: %s", ctx, err.Error())
		return errFailedRenderTemplateMessage
	}

	// _, _, err = c.mailer.SendMail(msg, c.mailConfig.Sender, email)
	blogger.Infof("Template msg: %s",msg)
	if err != nil {
		blogger.Errorf("[user/sendMailMessage]: ctx: %v, error: %s", ctx, err.Error())
		return errFailedToSendMessage
	}

	return nil
}

var (
	errFailedParseTime             = errors.New("failed to parse lastTime from cache")
	errTooFrequentCodeEntry        = errors.New("try latter")
	errFailedSaveLastTimeToCache   = errors.New("failed to save lastTime to cache")
	errTemplateNotFound            = errors.New("template not found")
	errFailedRenderTemplateMessage = errors.New("failed to render template message")
	errFailedToSendMessage         = errors.New("failed to send message")
)

func cachePrefix() string {
	return "user_code"
}
func retryPeriodPrefix() string {
	return "user_retry_period"
}
