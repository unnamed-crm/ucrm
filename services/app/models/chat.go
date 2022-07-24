package models

type Chat struct {
	CardId         string  `json:"card_id"`
	Id             string  `json:"id"`
	LastSender     *string `json:"last_sender,omitempty"`
	LastEmployeeId *string `json:"last_employee_id"`
	LastMessageId  *string `json:"last_message"`
}
