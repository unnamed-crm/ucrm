package tag

import "errors"

var (
	ErrDuplicateTag     = errors.New("duplicate dashboard tag")
	ErrDuplicateCardTag = errors.New("duplicate card tag")
	ErrAllFieldsEmpty = errors.New("one of the field must be not empty")
)
