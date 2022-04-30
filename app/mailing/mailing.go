package mailing

import (
	"context"

	"ucrm/app/config"
	"github.com/mailgun/mailgun-go/v4"
)

type Mailer interface {
	SendMail(msg string, subject string, recipient string) (string, string, error)
}

type MailgunApi struct {
	mg     *mailgun.MailgunImpl
	config config.MailConfig
}

func NewMailgunApi(config config.Config) *MailgunApi {
	mg := mailgun.NewMailgun(config.Mailgun.Domain, config.Mailgun.PrivateKey)
	return &MailgunApi{
		mg:     mg,
		config: config.Mail,
	}
}

func (m *MailgunApi) SendMail(msg string, subject string, recipient string) (string, string, error) {
	ctx := context.Background()
	message := m.mg.NewMessage(m.config.Sender, subject, msg, recipient)
	return m.mg.Send(ctx, message)
}
