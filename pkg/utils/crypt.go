package utils

import (
	"crypto/sha1"
	"fmt"
)

func CryptString(payload string, salt string) string {
	pwd := sha1.New()
	pwd.Write([]byte(payload))
	pwd.Write([]byte(salt))
	return fmt.Sprintf("%x", pwd.Sum(nil))
}
