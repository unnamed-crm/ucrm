package utils

import (
	"math/rand"
	"time"
)

func GenerateRandomNumber(low int, high int) int {
	src := rand.NewSource(time.Now().UnixNano())
	rand := rand.New(src)
	return low + rand.Intn(high-low)
}
