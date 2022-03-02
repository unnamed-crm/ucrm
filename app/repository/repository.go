package repository

import "github.com/ignavan39/tm-go/app/models"

type DashboardRepository interface {
	AddDashboard(name string, userId string) (*models.Dashboard, error)
	GetOneDashboard(dashboardId string) (*models.Dashboard, error)
	AddUserToDashboard(dashboardId string, userId string, access string) (*string, error)
}

type UserRepository interface {
	GetOneUserByEmail(email string, password string) (*models.User, error)
	AddUser(email string, password string) (*models.User, error)
}
