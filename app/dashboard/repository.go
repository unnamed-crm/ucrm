package dashboard

import "github.com/ignavan39/ucrm-go/app/models"

type Repository interface {
	Create(name string, userId string) (*models.Dashboard, error)
	GetSettings(xClientToken string) (*models.DashboardSettings, error)
	GetOne(dashboardId string) (*models.Dashboard, error)
	GetOneInternal(dashboardId string) (*models.Dashboard, error)
	AddAccess(dashboardId string, userId string, access string) error
	UpdateAccess(dashboardId string, userId string, access string) error
	RemoveAccess(dashboardId string, userId string) error
	GetOneWithUserAccess(dashboardId string, userId string, accessType string) (*models.Dashboard, error)
	UpdateName(dashboardId string, name string) error
	AddSettings(dashboardId string, secret string, xClientToken string) (*models.DashboardSettings, error)
	DeleteById(dashboardId string) error
	AddCustomField(dashboardId string, name string, isNullable bool, fieldType string) (*models.Field, error)
	DeleteCustomField(fieldId string) error
	GetOneByUser(userId string) ([]models.Dashboard, error)
}
