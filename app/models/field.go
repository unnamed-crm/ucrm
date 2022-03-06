package models

type Field struct {
	Id          string `json:"id"`
	IsNullable  bool   `json:"is_nullable"`
	Name        string `json:"name"`
	DashboardId string `json:"dashboard_id"`
}

type CardField struct {
	Id      string `json:"id"`
	CardId  string `json:"card_id"`
	FieldId string `json:"field_id"`
	Value   string `json:"value"`
	Field
}

type ContactField struct {
	Id        string `json:"id"`
	ContactId string `json:"contact_id"`
	FieldId   string `json:"field_id"`
	Value     string `json:"value"`
	Field
}
