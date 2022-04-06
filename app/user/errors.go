package user

import "errors"

var (
	ErrUserAlreadyExist = errors.New("user already exist")
	ErrFailedCreateAccessToken = errors.New("failed to create access token")
	ErrUserNotFound = errors.New("user not found ")
	ErrWrongCode = errors.New("wrong code")
	ErrFailedParseTime = errors.New("failed parse time")
	ErrTooFrequentCodeEntry = errors.New("try later")
	ErrFailedSaveLastTimeToCache = errors.New("failed to save last time to cache")
	ErrTemplateNotFound = errors.New("template not found")
	ErrFailedRenderTemplateMessage = errors.New("failed to render template message")
	ErrFailedToSendMessage = errors.New("failed to send mail message")
)
