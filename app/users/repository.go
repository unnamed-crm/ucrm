package user

import "github.com/ignavan39/ucrm-go/app/models"

type Repository interface {
	GetOneUserByEmail(email string, password string) (*models.User, error)
	AddUser(email string, password string) (*models.User, error)
}
