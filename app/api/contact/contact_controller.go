package contact

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
	blogger "github.com/sirupsen/logrus"
)

type Controller struct {
	contactRepo repository.ContactRepository
	cardRepo    repository.CardRepository
}

func NewController(contactRepo repository.ContactRepository, cardRepo repository.CardRepository) *Controller {
	return &Controller{
		contactRepo: contactRepo,
		cardRepo:    cardRepo,
	}
}

func (c *Controller) GetOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	contactId := chi.URLParam(r, "contactId")

	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[GetOne] wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	contact, err := c.contactRepo.GetOneContact(ctx, contactId)
	if err != nil {
		blogger.Errorf("[contact/GetOne] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[GetOne]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, contact, http.StatusOK)
}

func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload CreateOnePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateOne] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	contact, err := c.contactRepo.AddContact(ctx, payload.DashboardId, payload.CardId, payload.Name, payload.Phone, payload.City)
	if err != nil {
		blogger.Errorf("[contact/createOne] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[CreateOne]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, contact, http.StatusOK)
}

func (c *Controller) Rename(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	contactId := chi.URLParam(r, "contactId")
	newName := chi.URLParam(r, "newName")

	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Rename] wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	if len(newName) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Rename] wrong new name",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.contactRepo.RenameContact(ctx, contactId, newName)
	if err != nil {
		blogger.Errorf("[contact/Rename] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Rename]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (c *Controller) Update(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload UpdatePayload

	contactId := chi.URLParam(r, "contactId")
	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Rename] wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = payload.Validate()
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update]: Invalid params for update",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err = c.contactRepo.UpdateContact(ctx, contactId, payload.Name, payload.Phone, payload.City, payload.Fields)
	if err != nil {
		blogger.Errorf("[contact/Update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Update]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
}

func (c *Controller) Delete(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	contactId := chi.URLParam(r, "contactId")

	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Delete] wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	err := c.contactRepo.DeleteContact(ctx, contactId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Delete]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}
}
