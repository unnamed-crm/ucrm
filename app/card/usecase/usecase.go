package usecase

import (
	"context"

	"github.com/ignavan39/ucrm-go/app/card"
	"github.com/ignavan39/ucrm-go/app/core"
	dashboardSettings "github.com/ignavan39/ucrm-go/app/dashboard-settings"
	"github.com/ignavan39/ucrm-go/app/models"
	blogger "github.com/sirupsen/logrus"
)

type UseCase struct {
	repo            card.Repository
	cardWebhookRepo dashboardSettings.CardWebhookRepository
}

func NewUseCase(repo card.Repository, cardWebhookRepo dashboardSettings.CardWebhookRepository) *UseCase {
	return &UseCase{
		repo:            repo,
		cardWebhookRepo: cardWebhookRepo,
	}
}

func (uc *UseCase) CreateOne(ctx context.Context, pipelineId string, order int, name string) (*models.Card,error) {
	card, err := uc.repo.AddCard(ctx, name, order, pipelineId)
	if err != nil {
		blogger.Errorf("[card/createOne] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil,err
	}

	webhook, err := uc.cardWebhookRepo.GetCardWebhookByPipelineId(pipelineId)
	if err != nil {
		blogger.Errorf("[card/createOne] CTX: [%v], ERROR:[%s]", ctx, err.Error())
		return nil,err
	}

	go core.SendCardUpdatesToSubscriber(webhook.Url, card, nil)
	return card,nil
}

func (uc *UseCase) Delete(ctx context.Context, id string) (*models.Card, error) {
	card, err := uc.repo.GetOneCardWithoutRelations(ctx, id)

	if err != nil {
		return nil, err
	}

	if card == nil {
		return nil, nil
	}

	err = uc.repo.DeleteOneCard(ctx, id)
	if err != nil {
		return nil, err
	}

	webhook, err := uc.cardWebhookRepo.GetCardWebhookByPipelineId(card.PipelineId)
	if err != nil {
		return nil, err
	}

	if webhook != nil {
		go core.SendCardUpdatesToSubscriber(webhook.Url, nil, card)
	}
	return card, nil
}

func (uc *UseCase) Update(ctx context.Context,id string,name *string,fields *map[string]string) (*models.Card,error) {
	card, err := uc.repo.GetOneCard(ctx, id)
	if err != nil {
		return nil,err
	}

	if card == nil {
		return nil,nil
	}

	updatedCard, err := uc.repo.UpdateCard(ctx, id, name, fields)
	if err != nil {
		return nil,err
	}

	if updatedCard == nil {
		return nil,nil
	}

	webhook, err := uc.cardWebhookRepo.GetCardWebhookByPipelineId(card.PipelineId)
	if err != nil {
		return nil,err
	}

	if webhook != nil {
		go core.SendCardUpdatesToSubscriber(webhook.Url, card, updatedCard)
	}

	return updatedCard,nil
}

func (uc *UseCase) GetOne(ctx context.Context,id string) (*models.Card,error) {
	card, err := uc.repo.GetOneCard(ctx, id)
	if err != nil {
		return nil,err
	}

	if card == nil {
		return nil,nil
	}

	return card,nil
}

func (uc *UseCase) UpdateOrder(ctx context.Context, cardId string, pipelineId string, oldOrder int, newOrder int) error {
	if err :=  uc.repo.UpdateOrderForCard(ctx, cardId, pipelineId, oldOrder, newOrder);err != nil {
		return err
	}
	return nil
}
