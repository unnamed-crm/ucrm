package mailer

type Mailer interface {
	SendMail(subject string, msg string, sender string, recipient string) (string, string, error)
}
