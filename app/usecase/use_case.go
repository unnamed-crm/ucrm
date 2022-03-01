package usecase

import "github.com/ignavan39/tm-go/app/models"

type DashboardUseCase interface {
	AddDashboard(name string, userId string) (*models.Dashboard, error)
	GetOneDashboard(dashboardId string) (*models.Dashboard, error)
	AddUserToDashboard(dashboardId string, userId string, access string) (*string, error)
}

type UserUseCase interface {
	GetOneUserByEmail(email string, password string) (*models.User, error)
	AddUser(email string, password string) (*models.User, error)
}
