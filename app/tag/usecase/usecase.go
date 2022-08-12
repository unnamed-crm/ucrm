package usecase

import (
	"ucrm/app/tag"
	"ucrm/app/tag/api/dto"
)

type TagUseCase struct {
	repo tag.Repository
}

func NewTagUseCase(repo tag.Repository) *TagUseCase {
	return &TagUseCase{
		repo: repo,
	}
}

func (u *TagUseCase) CreateTag(payload dto.CreateTagPayload) (*dto.CreateTagResponse, error) {
	tag, err := u.repo.CreateTag(payload.DashboardId, payload.Text, payload.Description, payload.Color)

	if err != nil {
		return nil, err
	}

	return &dto.CreateTagResponse{
		Id:          tag.Id,
		DashboardId: tag.DashboardId,
		Text:        tag.Text,
		Description: tag.Description,
		Color:       tag.Color,
	}, nil
}

func (u *TagUseCase) CreateAndAttachTag(cardId string, payload dto.CreateTagPayload) (*dto.CreateTagResponse, error) {
	tag, err := u.repo.CreateAndInsertTag(cardId, payload.DashboardId, payload.Text, payload.Description, payload.Color)

	if err != nil {
		return nil, err
	}

	return &dto.CreateTagResponse{
		Id:          tag.Id,
		DashboardId: tag.DashboardId,
		Text:        tag.Text,
		Description: tag.Description,
		Color:       tag.Color,
	}, nil
}

func (u *TagUseCase) AttachTag(cardId string, tagId string) error {
	if err := u.repo.InsertCardTag(cardId, tagId); err != nil {
		return err
	}

	return nil
}

func (u *TagUseCase) DetachTag(cardId string, tagId string) error {
	if err := u.repo.DeleteCardTag(cardId, tagId); err != nil {
		return err
	}

	return nil
}

func (u *TagUseCase) DeleteTag(tagId string) error {
	if err := u.repo.DeleteTag(tagId); err != nil {
		return err
	}

	return nil
}

func (u *TagUseCase) UpdateTag(tagId string, payload dto.UpdateTagPayload) (*dto.UpdateTagResponse, error) {
	tag, err := u.repo.UpdateTag(tagId, payload.Text, payload.Description, payload.Color)

	if err != nil {
		return nil, err
	}

	return &dto.UpdateTagResponse{
		Id:          tag.Id,
		DashboardId: tag.DashboardId,
		Text:        tag.Text,
		Description: tag.Description,
		Color:       tag.Color,
	}, nil
}
