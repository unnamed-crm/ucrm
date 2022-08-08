package tag

import "ucrm/app/tag/api/dto"

type TagUseCase interface {
	CreateTag(payload dto.CreateTagPayload) (*dto.CreateTagResponse, error)
	CreateAndAttachTag(cardId string, payload dto.CreateTagPayload) (*dto.CreateTagResponse, error)
	AttachTag(cardId string, tagId string) error
	DetachTag(cardId string, tagId string) error
	DeleteTag(tagId string) error
	UpdateTag(tagId string, payload dto.UpdateTagPayload) (*dto.UpdateTagResponse, error)
}
