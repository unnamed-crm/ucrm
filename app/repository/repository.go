package repository

import "github.com/ignavan39/ucrm-go/app/models"

type DashboardRepository interface {
	AddDashboard(name string, userId string) (*models.Dashboard, error)
	GetOneDashboard(dashboardId string) (*models.Dashboard, error)
	AddUserToDashboard(dashboardId string, userId string, access string) (*string, error)
}

type UserRepository interface {
	GetOneUserByEmail(email string, password string) (*models.User, error)
	AddUser(email string, password string) (*models.User, error)
}

type PipelineRepository interface {
	AddPipeline(name string, userId string) (*models.Pipeline, error)
	GetOnePipeline(PipelineId string) (*models.Pipeline, error)
	AddUserToPipeline(pipelineId string, userId string, access string) (*string, error)
}
