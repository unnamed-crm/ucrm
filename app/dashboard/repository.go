package dashboard

import "github.com/ignavan39/ucrm-go/app/models"

type Repository interface {
	AddDashboard(name string, userId string) (*models.Dashboard, error)
	GetDashboardSettings(xClientToken string) (*models.DashboardSettings, error)
	GetOneDashboard(dashboardId string) (*models.Dashboard, error)
	GetOneDashboardInternal(dashboardId string) (*models.Dashboard, error)
	AddAccessToDashboard(dashboardId string, userId string, access string) error
	UpdateAccessDashboard(dashboardId string, userId string, access string) error
	RemoveAccessDashboard(dashboardId string, userId string) error
	GetOneDashboardWithUserAccess(dashboardId string, userId string, accessType string) (*models.Dashboard, error)
	UpdateDashboardName(dashboardId string, name string) error
	AddDashboardSettings(dashboardId string, secret string, xClientToken string) (*models.DashboardSettings, error)
	DeleteDashboardById(dashboardId string) error
	AddCustomField(dashboardId string, name string, isNullable bool, fieldType string) (*models.Field, error)
	GetDashboardsByUser(userId string) ([]models.Dashboard, error)
}
