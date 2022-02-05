package	users

type SignUpPayload struct {
	Password string `json:"password"`
	Email string `json:"email"`
}