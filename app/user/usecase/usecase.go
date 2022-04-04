package usecase

import (
	"context"
	"crypto/sha1"
	"errors"
	"fmt"

	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/core"
	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/app/user"

	"github.com/ignavan39/ucrm-go/pkg/redis-cache"

	blogger "github.com/sirupsen/logrus"
)

type UseCase struct {
	authUC     auth.UseCase
	repo       user.Repository
	mailer     core.Mailer
	mailConfig config.MailConfig
	cache      redisCache.RedisCache
}

func NewUseCase(
	authUC auth.UseCase,
	repo user.Repository,
	mailer core.Mailer,
	mailConfig config.MailConfig,
	cache redisCache.RedisCache,
) *UseCase {
	return &UseCase{
		authUC:     authUC,
		repo:       repo,
		mailer:     mailer,
		mailConfig: mailConfig,
		cache:      cache,
	}
}

func (uc *UseCase) SignUp(ctx context.Context, password string,email string,code int) (*models.User, string,bool,error) {
	var cacheCode int
	err := uc.cache.Get(ctx, fmt.Sprintf("%s_%s", cachePrefix(), email), &cacheCode)

	if err != nil {
		return nil,"",true,err
	}

	if cacheCode != code {
		return nil,"",false,errors.New("wrong code")
	}

	pwd := sha1.New()
	pwd.Write([]byte(password))
	pwd.Write([]byte(uc.authUC.GetHashSalt()))

	user, err := uc.repo.AddUser(email, fmt.Sprintf("%x", pwd.Sum(nil)))
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		return nil,"",false,errors.New("user already exists")
	}

	accessToken, err := uc.authUC.CreateToken(ctx, user.Id)
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		return nil,"",true,errors.New("failed created access token")
	}

	return user,accessToken,false,nil
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

	var lastTimeRaw string

	err = c.cache.Get(ctx, fmt.Sprintf("%s_%s", retryPeriodPrefix(), payload.Email), &lastTimeRaw)
	if err == nil {
		lastTime, err := time.Parse(time.RFC3339, lastTimeRaw)
		if err != nil {
			blogger.Errorf("Failed to parse lastTime: CTX: %v, Error: %s", ctx, err.Error())
			httpext.JSON(w, httpext.CommonError{
				Error: "failed parse time",
				Code:  http.StatusInternalServerError,
			}, http.StatusInternalServerError)
			return
		}
		if !time.Now().Add(time.Duration(-5) * time.Minute).After(lastTime) {
			httpext.JSON(w, httpext.CommonError{
				Error: "try later",
				Code:  http.StatusBadRequest,
			}, http.StatusBadRequest)
			return
		}
	}

	err = c.cache.Set(ctx,
		fmt.Sprintf("%s_%s", retryPeriodPrefix(), payload.Email),
		time.Now().Format(time.RFC3339))

	if err != nil {
		blogger.Errorf("Failed to save lastTime to redis: CTX: %v, Error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: "failed to save lastTime to redis",
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
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
func retryPeriodPrefix() string {
	return "user_retry_period"
}
