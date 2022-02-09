package database

import "database/sql"

type DbService struct {
	conn *sql.DB
}

func NewDbService(conn *sql.DB) *DbService {
	return &DbService{
		conn: conn,
	}
}
