package cards

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/ignavan39/ucrm-go/app/core/triggers"
	"github.com/ignavan39/ucrm-go/app/repository"
	"github.com/ignavan39/ucrm-go/pkg/httpext"
)

type Controller struct {
	repo        repository.CardRepository
	cardWebhookRepo repository.CardWebhookRepository
}

func NewController(repo repository.CardRepository, cardWebhookRepo repository.CardWebhookRepository) *Controller {
	return &Controller{
		repo:        repo,
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
			Error: "[CreateOne] failed to get pipeline",
			Code:  http.StatusBadRequest,
		}, http.StatusBadRequest)
		return
	}
	go triggers.SendCardUpdatesToSubscriber(webhook.Url, card, nil)
	httpext.JSON(w, card, http.StatusOK)
}
