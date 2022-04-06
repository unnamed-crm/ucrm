package usecase

import (
	"context"
	"fmt"
	"time"

	"github.com/ignavan39/ucrm-go/app/auth"
	"github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/core"
	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/app/user"

	"github.com/ignavan39/ucrm-go/pkg/redis-cache"
	"github.com/ignavan39/ucrm-go/pkg/utils"
	blogger "github.com/sirupsen/logrus"
)

type UserUseCase struct {
	auth       auth.AuthUseCase
	repo       user.Repository
	mailer     core.Mailer
	mailConfig config.MailConfig
	cache      redisCache.RedisCache
}

func NewUserUseCase(
	a auth.AuthUseCase,
	repo user.Repository,
	mailer core.Mailer,
	mailConfig config.MailConfig,
	cache redisCache.RedisCache,
) *UserUseCase {
	return &UserUseCase{
		auth:       a,
		repo:       repo,
		mailer:     mailer,
		mailConfig: mailConfig,
		cache:      cache,
	}
}

func (uc *UserUseCase) SignIn(ctx context.Context, email string, password string) (*user.SignResponse, error) {
	userModel, err := uc.repo.GetOneByEmail(email, utils.CryptString(password, uc.auth.GetHashSalt()))
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		return nil, user.ErrUserAlreadyExist
	}

	if userModel == nil {
		return nil, user.ErrUserNotFound
	}

	accessToken, err := uc.auth.CreateToken(ctx, userModel.Id)
	if err != nil {
		return nil, user.ErrFailedCreateAccessToken
	}

	return &user.SignResponse{
		Token: accessToken,
		User:  *userModel,
	}, nil
}

func (uc *UserUseCase) SignUp(ctx context.Context, email string, password string, code int) (*user.SignResponse, error) {
	var cacheCode int
	err := uc.cache.Get(ctx, fmt.Sprintf("%s_%s", cacheVerifyPrefix(), email), &cacheCode)

	if err != nil {
		return nil, user.ErrWrongCode
	}

	if code != cacheCode {
		return nil, user.ErrWrongCode
	}

	userModel, err := uc.repo.Create(email, utils.CryptString(password, uc.auth.GetHashSalt()))
	if err != nil {
		blogger.Errorf("[user/sign-up] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		return nil, user.ErrUserAlreadyExist
	}

	accessToken, err := uc.auth.CreateToken(ctx, userModel.Id)
	if err != nil {
		return nil, user.ErrFailedCreateAccessToken
	}

	return &user.SignResponse{
		Token: accessToken,
		User:  *userModel,
	}, nil
}

func (uc *UserUseCase) RecoveryPassword(ctx context.Context, email string, password string, code int) (*models.User, error) {
	var cacheCode int
	err := uc.cache.Get(ctx, fmt.Sprintf("%s_%s", cacheVerifyPrefix(), email), &cacheCode)

	if err != nil {
		return nil, user.ErrWrongCode
	}

	if code != cacheCode {
		return nil, user.ErrWrongCode
	}

	userModel, err := uc.repo.UpdatePassword(email, utils.CryptString(password, uc.auth.GetHashSalt()))
	if err != nil {
		blogger.Errorf("[user/recoveryPassword] CTX:[%v], ERROR:[%s]", ctx, err.Error())
		return nil, err
	}

	return userModel, nil
}

func (uc *UserUseCase) SendVerifyCode(ctx context.Context, email string) error {
	return uc.sendCode(ctx, cacheVerifyPrefix(), "verification", time.Minute*5, email)
}

func (uc *UserUseCase) SendRecoveryCode(ctx context.Context, email string) error {
	return uc.sendCode(ctx, cacheVerifyPrefix(), "recovery-password", time.Minute*5, email)
}

func (c *UserUseCase) sendCode(
	ctx context.Context,
	cachePrefix string,
	templateKey string,
	expireTime time.Duration,
	email string,
) error {
	var lastTimeRaw string

	err := c.cache.Get(ctx, fmt.Sprintf("%s_%s", retryPeriodPrefix(), email), &lastTimeRaw)
	if err == nil {
		lastTime, err := time.Parse(time.RFC3339, lastTimeRaw)
		if err != nil {
			return user.ErrFailedParseTime
		}
		if !time.Now().Add(time.Duration(-5) * time.Minute).After(lastTime) {
			return user.ErrTooFrequentCodeEntry
		}
	}

	err = c.cache.Set(ctx,
		fmt.Sprintf("%s_%s", retryPeriodPrefix(), email),
		time.Now().Format(time.RFC3339))

	if err != nil {
		return user.ErrFailedSaveLastTimeToCache
	}

	code := utils.GenerateRandomNumber(10000, 99999)
	Data := make(map[string]string)
	Data["Code"] = fmt.Sprint(code)
	template, found := c.mailConfig.Letters[templateKey]
	c.cache.SetWithExpiration(ctx, fmt.Sprintf("%s_%s", cachePrefix, email), expireTime, code)

	if !found {
		return user.ErrTemplateNotFound
	}

	msg, err := utils.RenderTemplate(template.Template, utils.WrapTemplateData(Data))
	if err != nil {
		return user.ErrFailedRenderTemplateMessage
	}

	_, _, err = c.mailer.SendMail(msg, c.mailConfig.Sender, email)
	if err != nil {
		return user.ErrFailedToSendMessage
	}
	return nil
}

func cacheVerifyPrefix() string {
	return "user_code"
}
func retryPeriodPrefix() string {
	return "user_retry_period"
}
