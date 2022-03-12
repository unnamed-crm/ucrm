package cards

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ignavan39/ucrm-go/app/core/triggers"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	repo            repository.CardRepository
	cardWebhookRepo repository.CardWebhookRepository
}

func NewController(repo repository.CardRepository, cardWebhookRepo repository.CardWebhookRepository) *Controller {
	return &Controller{
		repo:            repo,
		cardWebhookRepo: cardWebhookRepo,
	}
}

func (c *Controller) CreateOne(w http.ResponseWriter, r *http.Request) {
	var payload CreateOnePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateOne] failed decode payload",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	card, err := c.repo.AddCard(payload.Name, payload.Order, payload.PipelineId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[CreateOne]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	webhook, err := c.cardWebhookRepo.GetCardWebhookByPipelineId(payload.PipelineId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[CreateOne] failed to get webhook",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	go triggers.SendCardUpdatesToSubscriber(webhook.Url, card, nil)
	httpext.JSON(w, card, http.StatusOK)
}

func (c *Controller) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "cardId")
	card, err := c.repo.GetOneCard(id)

	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Delete]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	if card == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "card not found",
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}

	err = c.repo.DeleteOneCard(id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Delete]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	webhook, err := c.cardWebhookRepo.GetCardWebhookByPipelineId(card.PipelineId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Delete] failed to get webhook",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	go triggers.SendCardUpdatesToSubscriber(webhook.Url, nil, card)
	httpext.JSON(w, card, http.StatusOK)
}

func (c *Controller) Update(w http.ResponseWriter, r *http.Request) {
	var payload UpdateOnePayload
	id := chi.URLParam(r, "cardId")

	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update] wrong id",
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

	card, err := c.repo.GetOneCard(id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[GetOne]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	if card == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "card not found",
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}

	updatedCard, err := c.repo.UpdateCard(payload.Name, id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[Update]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	webhook, err := c.cardWebhookRepo.GetCardWebhookByPipelineId(card.PipelineId)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update] failed to get pipeline",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	go triggers.SendCardUpdatesToSubscriber(webhook.Url, updatedCard, card)
	httpext.JSON(w, card, http.StatusOK)
}

func (c *Controller) GetOne(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "cardId")
	if len(id) == 0 {
		httpext.JSON(w, httpext.CommonError{
			Error: "[Update] wrong id",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}

	card, err := c.repo.GetOneCard(id)
	if err != nil {
		httpext.JSON(w, httpext.CommonError{
			Error: fmt.Sprintf("[GetOne]:%s", err.Error()),
			Code:  http.StatusInternalServerError,
		}, http.StatusInternalServerError)
		return
	}

	if card == nil {
		httpext.JSON(w, httpext.CommonError{
			Error: "card not found",
			Code:  http.StatusNotFound,
		}, http.StatusNotFound)
		return
	}
	httpext.JSON(w, card, http.StatusOK)
}
