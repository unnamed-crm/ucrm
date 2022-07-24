package httpext

type CommonError struct {
	Error string `json:"error"`
	Code  int    `json:"code"`
}
