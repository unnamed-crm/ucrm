package smtpext

import (
	"github.com/enmex/smtp/config"
	s "github.com/enmex/smtp/sender"
)

var (
	gmailHost    = "smtp.gmail.com:"
	gmailAddress = "smtp.gmail.com:465"
)

type SmtpMailer struct {
	srv s.Sender
}

func NewSmtpMailer(user string, pass string) *SmtpMailer {
	providers := make(map[string]config.Provider, 1)
	providers["default"] = config.Provider{
		Credentials: config.Credentials{
			User:     user,
			Password: pass,
		},
		Delivery: config.Delivery{
			Host:    gmailHost,
			Address: gmailAddress,
		},
	}
	return &SmtpMailer{
		srv: *s.NewSender(config.Config{
			Mode:      config.SingleMode,
			Providers: providers,
		}),
	}
}

func (m *SmtpMailer) SendMail(subject string, msg string, sender string, recipient string) (string, string, error) {
	if err := m.srv.Send(s.SendMailPayload{
		Provider:   "default",
		SenderMail: sender,
		Subject:    subject,
		Message:    msg,
		Recipient:  recipient,
	}); err != nil {
		return "", "", err
	}

	return msg, recipient, nil
}
