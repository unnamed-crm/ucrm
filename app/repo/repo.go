package repo

import "database/sql"

type Repository struct {
	conn *sql.DB
}

func NewRepository(conn *sql.DB) *Repository {
	return &Repository{
		conn: conn,
	}
}
