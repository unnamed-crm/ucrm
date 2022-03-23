package repository

import "github.com/ignavan39/ucrm-go/app/models"

type DashboardRepository interface {
	AddDashboard(name string, userId string) (*models.Dashboard, error)
	GetDashboardSettings(xClientToken string) (*models.DashboardSettings, error)
	GetOneDashboard(dashboardId string) (*models.Dashboard, error)
	AddUserToDashboard(dashboardId string, userId string, access string) (*string, error)
	GetOneDashboardWithUserAccess(dashboardId string, userId string, accessType string) (*models.Dashboard, error)
	UpdateDashboardName(dashboardId string, name string) error
	AddDashboardSettings(dashboardId string, secret string, xClientToken string) (*models.DashboardSettings, error)
	DeleteDashboardById(dashboardId string) error
	AddCustomField(dashboardId string, name string, isNullable bool, fieldType string) (*models.Field, error)
}
