package database

import (
	"database/sql"
	"errors"

	"github.com/ignavan39/ucrm-go/app/models"
	"github.com/ignavan39/ucrm-go/pkg/pg"

	sq "github.com/Masterminds/squirrel"
)

type Repository struct {
	pool pg.Pool
}

func NewRepository(pool pg.Pool) *Repository {
	return &Repository{
		pool: pool,
	}
}

func (r *Repository) Create(email string, password string) (*models.User, error) {
	user := &models.User{}

	row := sq.Insert("users").
		Columns("password", "email").
		Values(password, email).
		Suffix("returning id,password,email,created_at").
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&user.Id, &user.Password, &user.Email, &user.CreatedAt); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *Repository) GetOneByEmail(email string, password string) (*models.User, error) {
	user := &models.User{}

	row := sq.Select("id,email,password,avatar_url,created_at").
		From("users").
		Where(sq.Eq{"email": email, "password": password}).
		RunWith(r.pool.Read()).
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

func (r *Repository) UpdatePassword(email string, password string) (*models.User, error) {
	user := &models.User{}

	row := sq.Update("users").
		Set("password", password).
		Where(sq.Eq{"email": email}).
		PlaceholderFormat(sq.Dollar).
		RunWith(r.pool.Write()).
		Suffix("returning id,email,password,avatar_url,created_at").
		QueryRow()

	if err := row.Scan(&user.Id, &user.Email, &user.Password, &user.AvatarUrl, &user.CreatedAt); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}
