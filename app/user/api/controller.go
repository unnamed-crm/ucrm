package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/ignavan39/ucrm-go/app/user"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

func ErrorWrapper(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, user.ErrWrongCode),
		errors.Is(err, user.ErrTooFrequentCodeEntry),
		errors.Is(err, user.ErrUserAlreadyExist):
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
	case errors.Is(err, user.ErrFailedParseTime),
		errors.Is(err, user.ErrFailedRenderTemplateMessage),
		errors.Is(err, user.ErrFailedSaveLastTimeToCache),
		errors.Is(err, user.ErrFailedCreateAccessToken),
		errors.Is(err, user.ErrFailedToSendMessage),
		errors.Is(err, user.ErrTemplateNotFound):
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	case errors.Is(err, user.ErrUserNotFound):
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
	default:
		httpext.JSON(w, httpext.CommonError{
			Error: err.Error(),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
	}
}

type Controller struct {
	uc user.UserUseCase
}

func NewController(
	uc user.UserUseCase,
) *Controller {
	return &Controller{
		uc: uc,
	}
}

func (c *Controller) SignUp(w http.ResponseWriter, r *http.Request) {
	var payload user.SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Password) < 5 {
		httpext.JSON(w, httpext.CommonError{
			Error: "password too short",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	result, err := c.uc.SignUp(ctx, payload.Email, payload.Password, payload.Code)
	if err != nil {
		ErrorWrapper(w, err)
		return
	}
	httpext.JSON(w, result, http.StatusCreated)
}

func (c *Controller) SignIn(w http.ResponseWriter, r *http.Request) {
	var payload user.SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	result, err := c.uc.SignIn(ctx, payload.Email, payload.Password)
	if err != nil {
		ErrorWrapper(w, err)
		return
	}

	httpext.JSON(w, result, http.StatusCreated)
}

func (c *Controller) SendVerifyCode(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload user.SendCodePayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = c.uc.SendVerifyCode(ctx, payload.Email)
	if err != nil {
		ErrorWrapper(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) SendRecoveryCode(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload user.SendCodePayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = c.uc.SendRecoveryCode(ctx, payload.Email)
	if err != nil {
		ErrorWrapper(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) RecoveryPassword(w http.ResponseWriter, r *http.Request) {
	var payload user.SignPayload
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(payload.Password) < 5 {
		httpext.JSON(w, httpext.CommonError{
			Error: "password too short",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	ctx := r.Context()

	user,err := c.uc.RecoveryPassword(ctx,payload.Email,payload.Password,payload.Code)
	if err != nil {
		ErrorWrapper(w, err)
		return
	}

	httpext.JSON(w,user,http.StatusOK)
}
