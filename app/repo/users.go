package repo

import (
	"github.com/ignavan39/tm-go/app/models"

	sq "github.com/Masterminds/squirrel"
)


func (r *Repository) AddUser(email string,password string)(*models.User,error) {
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