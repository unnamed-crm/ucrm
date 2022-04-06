package user

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/models"
)

type UserUseCase interface {
	SignUp(ctx context.Context, email string,password string,code int) (*SignResponse, error)
	SignIn(ctx context.Context,email string,password string) (*SignResponse, error)
	SendVerifyCode(ctx context.Context,email string) (error)
	SendRecoveryCode(ctx context.Context,email string) (error)
	RecoveryPassword(ctx context.Context, email string,password string,code int) (*models.User,error)
}
