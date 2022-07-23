package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"ucrm/app/card"
	"ucrm/app/contact"

	"github.com/go-chi/chi"
	"github.com/ignavan39/go-pkgs/httpext"
	blogger "github.com/sirupsen/logrus"
)

type Controller struct {
	contactRepo contact.Repository
	cardRepo    card.Repository
}

func NewController(contactRepo contact.Repository, cardRepo card.Repository) *Controller {
	return &Controller{
		contactRepo: contactRepo,
		cardRepo:    cardRepo,
	}
}

// GetOne godoc
// @Summary   Get contact
// @Tags      contacts
// @Produce   json
// @Success   200  {object}  models.Contact
// @Failure   400  {object}  httpext.CommonError
// @Failure   401  {object}  httpext.CommonError
// @Failure   500  {object}  httpext.CommonError
// @Router    /contacts/{contactId} [get]
// @security  JWT
func (c *Controller) GetOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	contactId := chi.URLParam(r, "contactId")

	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[GetOne] wrong id",
		}, http.StatusBadRequest)
		return
	}

	contact, err := c.contactRepo.GetOne(ctx, contactId)
	if err != nil {
		blogger.Errorf("[contact/GetOne] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[GetOne]:%s", err.Error()),
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, contact, http.StatusOK)
}

// CreateOne godoc
// @Summary   Create contact
// @Tags      contacts
// @Accept    json
// @Produce   json
// @Param     payload  body      CreateOnePayload  true  " "
// @Success   201      {object}  models.Contact
// @Failure   400      {object}  httpext.CommonError
// @Failure   401      {object}  httpext.CommonError
// @Failure   500      {object}  httpext.CommonError
// @Router    /contacts/create [post]
// @security  JWT
func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload CreateOnePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateOne] failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	contactModel, err := c.contactRepo.Create(ctx, payload.DashboardId, payload.CardId, payload.Name, payload.Phone, payload.City, payload.Fields)
	if err != nil {
		if errors.Is(err, contact.ErrFieldNotFound) {
			httpext.JSON(w, httpext.CommonError{
				Error: fmt.Sprintf("[CreateOne]:%s", err.Error()),
			}, http.StatusBadRequest)
			return
		}

		blogger.Errorf("[contact/createOne] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[CreateOne]:%s", err.Error()),
		}, http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, contactModel, http.StatusOK)
}

// Rename godoc
// @Summary   Rename contact
// @Tags      contacts
// @Param     contactId  query  string  true  " "
// @Param     newName    query  string  true  " "
// @Success   200
// @Failure   400  {object}  httpext.CommonError
// @Failure   401  {object}  httpext.CommonError
// @Failure   500  {object}  httpext.CommonError
// @Router    /contacts/{contactId}/{newName} [patch]
// @security  JWT
func (c *Controller) Rename(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	contactId := chi.URLParam(r, "contactId")
	newName := chi.URLParam(r, "newName")

	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Rename] wrong id",
		}, http.StatusBadRequest)
		return
	}

	if len(newName) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Rename] wrong new name",
		}, http.StatusBadRequest)
		return
	}

	err := c.contactRepo.Rename(ctx, contactId, newName)
	if err != nil {
		blogger.Errorf("[contact/Rename] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Rename]:%s", err.Error()),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// Update godoc
// @Accept    json
// @Summary   Update contact
// @Tags      contacts
// @Param     contactId  query  string         true  " "
// @Param     payload    body   UpdatePayload  true  " "
// @Success   200
// @Failure   400  {object}  httpext.CommonError
// @Failure   401  {object}  httpext.CommonError
// @Failure   500  {object}  httpext.CommonError
// @Router    /contacts/{contactId} [patch]
// @security  JWT
func (c *Controller) Update(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var payload UpdatePayload

	contactId := chi.URLParam(r, "contactId")
	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Rename] wrong id",
		}, http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update] failed decode payload",
		}, http.StatusBadRequest)
		return
	}

	err = payload.Validate()
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update]: Invalid params for update",
		}, http.StatusBadRequest)
		return
	}

	err = c.contactRepo.Update(ctx, contactId, payload.Name, payload.Phone, payload.City, payload.Fields)
	if err != nil {
		blogger.Errorf("[contact/Update] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Update]:%s", err.Error()),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// Delete godoc
// @Accept    json
// @Produce   json
// @Summary   Delete contact
// @Param     contactId  query  string  true  " "
// @Tags      contacts
// @Success   200
// @Failure   400  {object}  httpext.CommonError
// @Failure   401  {object}  httpext.CommonError
// @Failure   500  {object}  httpext.CommonError
// @Router    /contacts/{contactId} [delete]
// @security  JWT
func (c *Controller) Delete(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	contactId := chi.URLParam(r, "contactId")

	if len(contactId) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Delete] wrong id",
		}, http.StatusBadRequest)
		return
	}

	err := c.contactRepo.Delete(ctx, contactId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Delete]:%s", err.Error()),
		}, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
