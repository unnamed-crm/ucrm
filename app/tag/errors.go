package tag

import "errors"

var (
	ErrDuplicateTag     = errors.New("duplicate dashboard tag")
	ErrDuplicateCardTag = errors.New("duplicate card tag")
)
