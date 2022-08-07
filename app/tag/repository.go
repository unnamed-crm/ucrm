package tag

import (
	"errors"
	"ucrm/app/models"
)

type Repository interface {
	CreateTag(cardId string, dashboardId string, text string, description string, color string) (*models.Tag, error)
	InsertCardTag(cardId string, tagId string) error
	DeleteCardTag(cardId string, tagId string) error
	DeleteTag(tagId string) error
}

var (
	ErrDuplicateTag = errors.New("duplicate dashboard tag")
	ErrDuplicateCardTag = errors.New("duplicate card tag")
)
