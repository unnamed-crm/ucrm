package smtp

type SendMailPayload struct {
	Provider   string `json:"provider"`
	SenderMail string `json:"sender_mail"`
	Subject    string `json:"subject"`
	Message    string `json:"message"`
	Recipient  string `json:"recipient"`
}
