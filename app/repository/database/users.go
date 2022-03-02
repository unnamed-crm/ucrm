package database

import (
	"database/sql"
	"errors"

	"github.com/ignavan39/tm-go/app/models"

	sq "github.com/Masterminds/squirrel"
)

func (r *DbService) AddUser(email string, password string) (*models.User, error) {
	user := &models.User{}
	row := sq.Insert("users").Columns("password", "email").
		Values(password, email).
		Suffix("returning id,password,email,created_at").
		RunWith(r.conn).PlaceholderFormat(sq.Dollar).QueryRow()
	if err := row.Scan(&user.Id, &user.Password, &user.Email, &user.CreatedAt); err != nil {
		return nil, err
	}
	return user, nil
}

func (r *DbService) GetOneUserByEmail(email string, password string) (*models.User, error) {
	user := &models.User{}
	row := sq.Select("id,email,password,coalesce(avatar_url,'') as avatar_url,created_at").
		From("users").
		Where(sq.Eq{"email": email, "password": password}).
		RunWith(r.conn).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&user.Id, &user.Email, &user.Password, &user.AvatarUrl, &user.CreatedAt); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}
