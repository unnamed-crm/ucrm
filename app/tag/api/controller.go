package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"ucrm/app/tag"
	repository "ucrm/app/tag"

	"ucrm/pkg/httpext"
	"ucrm/pkg/logger"

	"github.com/go-chi/chi"
)

type Controller struct {
	repo tag.Repository
}

func NewController(repo tag.Repository) *Controller {
	return &Controller{
		repo: repo,
	}
}

func (c *Controller) CreateTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cardId := chi.URLParam(r, "cardId")
	var payload CreateTagPayload

	if len(cardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing cardId: cards/createTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateTag] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = payload.Validate()
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	tag, err := c.repo.CreateTag(cardId, payload.DashboardId, payload.Text, *payload.Description, payload.Color)
	if err != nil {
		if errors.Is(err, repository.ErrDuplicateTag) {
			httpext.JSON(w, httpext.CommonError{
				Error: fmt.Sprintf("[CreateTag]:%s", err.Error()),
				Code:  http.StatusBadRequest,
			}, http.StatusBadRequest)
			return
		}
		logger.Logger.Errorf("[card/createTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[CreateTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	}

	httpext.JSON(w, tag, http.StatusCreated)
}

func (c *Controller) DeleteTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	tagId := chi.URLParam(r, "tagId")

	if len(tagId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing tagId: cards/DeleteTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.repo.DeleteTag(tagId)
	if err != nil {
		logger.Logger.Errorf("[card/deleteTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[DeleteTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, nil, http.StatusOK)
}

func (c *Controller) AttachTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cardId := chi.URLParam(r, "cardId")
	tagId := chi.URLParam(r, "tagId")

	if len(cardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing cardId: cards/AttachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(tagId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing tagId: cards/AttachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.repo.InsertCardTag(cardId, tagId)
	if err != nil {
		if errors.Is(err, repository.ErrDuplicateCardTag) {
			httpext.JSON(w, httpext.CommonError{
				Error: fmt.Sprintf("[AttachTag]:%s", err.Error()),
				Code:  http.StatusBadRequest,
			}, http.StatusBadRequest)
			return
		}
		logger.Logger.Errorf("[card/attachTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[AttachTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, nil, http.StatusOK)
}

func (c *Controller) DetachTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cardId := chi.URLParam(r, "cardId")
	tagId := chi.URLParam(r, "tagId")

	if len(cardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing cardId: cards/AttachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(tagId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing tagId: cards/AttachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.repo.DeleteCardTag(cardId, tagId)
	if err != nil {
		logger.Logger.Errorf("[card/attachTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[AttachTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, nil, http.StatusOK)
}
