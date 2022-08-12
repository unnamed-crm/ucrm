package tag

import (
	"ucrm/app/models"
)

type Repository interface {
	CreateTag(dashboardId string, text string, description *string, color string) (*models.Tag, error)
	CreateAndAttachTag(cardId string, dashboardId string, text string, description *string, color string) (*models.Tag, error)
	InsertCardTag(cardId string, tagId string) error
	DeleteCardTag(cardId string, tagId string) error
	DeleteTag(tagId string) error
	UpdateTag(tagId string, text *string, description *string, color *string) (*models.Tag, error)
}
