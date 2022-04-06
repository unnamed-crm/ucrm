package utils

import "errors"

func MultiplieErrorsIs(err error,targets ...error) bool {
	for _,t := range targets {
		if errors.Is(err,t){
			return true
		}
	}
	return false
}
