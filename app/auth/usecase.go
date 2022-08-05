package auth

import "context"

type AuthUseCase interface {
	CreateToken(ctx context.Context, id string) (string, error)
}
