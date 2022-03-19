package database

import (
	"database/sql"
	"errors"
	"fmt"
	"strconv"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
)

func (r *DbService) AddCard(name string, order int, pipelineId string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Insert("cards").
		Columns("name", "pipeline_id", `"order"`).
		Values(name, pipelineId, order).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	var chat models.Chat
	chatRow := sq.Insert("chats").
		Columns("card_id").
		Values(card.Id).
		Suffix(`returning id,card_id,last_sender,last_employee_id,last_message`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := chatRow.Scan(&chat.Id,&chat.CardId,&chat.LastSender,&chat.LastEmployeeId,&chat.LastMessageId); err != nil {
		return nil, err
	}
	card.Chat = &chat
	return card, nil
}

//TODO custom fields
func (r *DbService) UpdateCard(cardId string, name string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Update("cards").
		Set("name", name).
		Suffix(`returning id,name,pipeline_id,updated_at,"order"`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *DbService) GetOneCard(cardId string) (*models.Card, error) {
	card := &models.Card{}

	row := sq.Select("id", "name", "pipeline_id", "updated_at", `"order"`).
		From("cards").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Read()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&card.Id, &card.Name, &card.PipelineId, &card.UpdatedAt, &card.Order); err != nil {
		return nil, err
	}

	return card, nil
}

func (r *DbService) DeleteOneCard(cardId string) error {
	_, err := sq.Delete("cards").
		Where(sq.Eq{"id": cardId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		return err
	}

	return nil
}

func (r *DbService) UpdateOrderForCard(cardId string, pipelineId string, oldOrder int, newOrder int) error {
	if newOrder <= 0 {
		return errors.New("incorrect order for pipeline")
	}

	var changeOperator string
	var comparisionMark string

	if newOrder > oldOrder {
		changeOperator = "-"
		comparisionMark = "<="
	} else {
		changeOperator = "+"
		comparisionMark = ">="
	}

	_, err :=
		sq.Update("cards c").
			Set(`"order"`,
				sq.Case().
					When(sq.Expr("c.id = ?", cardId), strconv.Itoa(newOrder)).
					When(sq.Expr(fmt.Sprintf("c.order %s ?", comparisionMark), strconv.Itoa(newOrder)),
						fmt.Sprintf("c.order %s 1", changeOperator)).
					Else(sq.Expr(`"order"`)),
			).
			Where(sq.Eq{"pipeline_id": pipelineId}).
			RunWith(r.pool.Write()).
			PlaceholderFormat(sq.Dollar).
			Exec()

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil
		}
		return err
	}

	return nil
}
