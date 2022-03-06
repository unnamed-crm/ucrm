package database

import (

	"github.com/ignavan39/ucrm-go/pkg/pg"
)

type DbService struct {
	pool pg.Pool
}

func NewDbService(pool pg.Pool) *DbService {
	return &DbService{
		pool: pool,
	}
}
