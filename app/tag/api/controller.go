package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"ucrm/app/tag"
	"ucrm/app/tag/api/dto"
	"ucrm/app/tag/usecase"
	"ucrm/pkg/httpext"
	"ucrm/pkg/logger"

	"github.com/go-chi/chi"
)

type Controller struct {
	tagUseCase usecase.TagUseCase
}

func NewController(tagUseCase usecase.TagUseCase) *Controller {
	return &Controller{
		tagUseCase: tagUseCase,
	}
}

// CreateTag godoc
// @Summary      Create tag
// @Description  Create tag in dashboard
// @Tags         tags
// @Accept    json
// @Produce   json
// @Param     payload  body      dto.CreateTagPayload  true  " "
// @Success      201  {object}  dto.CreateTagResponse
// @Failure      400  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /tags/create/{cardId} [post]
// @security     JWT
func (c *Controller) CreateTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload dto.CreateTagPayload

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateTag] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if err := payload.Validate(); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	res, err := c.tagUseCase.CreateTag(payload)
	if err != nil {
		if errors.Is(err, tag.ErrDuplicateTag) {
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
		return
	}

	httpext.JSON(w, res, http.StatusCreated)
} 

// CreateAndAttachTag godoc
// @Summary      Create and attach tag
// @Description  Create and attach tag for card in dashboard
// @Tags         tags
// @Accept    json
// @Produce   json
// @Param     payload  body      dto.CreateTagPayload  true  " "
// @Param        cardId      query  string  true  " "
// @Success      201  {object}  dto.CreateTagResponse
// @Failure      400  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /tags/create/{cardId} [post]
// @security     JWT
func (c *Controller) CreateAndAttachTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cardId := chi.URLParam(r, "cardId")
	var payload dto.CreateTagPayload

	if len(cardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing cardId: cards/createAndAttachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateAndAttachTag] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if err := payload.Validate(); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	res, err := c.tagUseCase.CreateAndAttachTag(cardId, payload)
	if err != nil {
		if errors.Is(err, tag.ErrDuplicateTag) {
			httpext.JSON(w, httpext.CommonError{
				Error: fmt.Sprintf("[CreateAndAttachTag]:%s", err.Error()),
				Code:  http.StatusBadRequest,
			}, http.StatusBadRequest)
			return
		}
		logger.Logger.Errorf("[card/createAndAttachTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[CreateAndAttachTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, res, http.StatusCreated)
}

// DeleteTag godoc
// @Summary      Delete tag
// @Description  Delete tag from dashboard
// @Produce   	 json
// @Tags         tags
// @Param        tagId      query  string  true  " "
// @Success      200
// @Failure      400  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /tags/{tagId} [delete]
// @security     JWT
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

	err := c.tagUseCase.DeleteTag(tagId)
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

// AttachTag godoc
// @Summary      Attach tag
// @Description  Attach tag to card
// @Tags         tags
// @Param        cardId      query  string  true  " "
// @Param        tagId      query  string  true  " "
// @Success      200
// @Failure      400  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /attach/{cardId}/{tagId} [post]
// @security     JWT
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

	err := c.tagUseCase.AttachTag(cardId, tagId)
	if err != nil {
		if errors.Is(err, tag.ErrDuplicateCardTag) {
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

// DetachTag godoc
// @Summary      Detach tag
// @Description  Detach tag from card
// @Tags         tags
// @Param        cardId      query  string  true  " "
// @Param        tagId      query  string  true  " "
// @Success      200
// @Failure      400  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /detach/{cardId}/{tagId} [post]
// @security     JWT
func (c *Controller) DetachTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	cardId := chi.URLParam(r, "cardId")
	tagId := chi.URLParam(r, "tagId")

	if len(cardId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing cardId: cards/DetachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(tagId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing tagId: cards/DetachTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.tagUseCase.DetachTag(cardId, tagId)
	if err != nil {
		logger.Logger.Errorf("[card/detachTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[DetachTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, nil, http.StatusOK)
}

// UpdateTag godoc
// @Summary      Update tag
// @Description  Update tag
// @Tags         tags
// @Accept    json
// @Produce   json
// @Param        tagId      query  string  true  " "
// @Param     payload  body      dto.UpdateTagPayload  true  " "
// @Success      200  {object}  dto.UpdateTagResponse
// @Failure      400  {object}  httpext.CommonError
// @Failure      500  {object}  httpext.CommonError
// @Router       /{tagId} [patch]
// @security     JWT
func (c *Controller) UpdateTag(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	tagId := chi.URLParam(r, "tagId")
	var payload dto.UpdateTagPayload

	if len(tagId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "missing tagId: cards/UpdateTag",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[UpdateTag] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if err := payload.Validate(); err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	res, err := c.tagUseCase.UpdateTag(tagId, payload)
	if err != nil {
		logger.Logger.Errorf("[card/updateTag] ctx: %v, error: %s", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[UpdateTag]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, res, http.StatusOK)
}
