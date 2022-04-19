package pg

import (
	"encoding/json"
	"time"

	sq "github.com/Masterminds/squirrel"
	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/pkg/pg"
)

type Repository struct {
	pool pg.Pool
}

func NewRepository(pool pg.Pool) *Repository {
	return &Repository{
		pool: pool,
	}
}

func (d *Repository) CreateOneMessage(payload models.MessagePayload, senderId string, deleted bool, status string, createdAt time.Time, chatId string) (*models.Message, error) {
	message := &models.Message{}

	stringifyPayload, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	row := sq.Insert("messages").Columns("chat_id", "payload", "sender_id", "created_at", "deleted", "status").
		Values(chatId, string(stringifyPayload), senderId, createdAt, deleted, status).
		Suffix("returning id, chat_id, payload,sender_id, created_at, deleted, status").
		RunWith(d.pool.Write()).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&message.Id, &message.ChatId, &message.Payload, &message.SenderId, &message.Deleted, &message.Status); err != nil {
		return nil, err
	}

	message.Payload = payload
	return message, nil
}
