package repository

import (
	"strings"
	"ucrm/pkg/pg"

	"ucrm/app/models"
	repository "ucrm/app/tag"

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

func (r *Repository) CreateTag(dashboardId string, text string, description *string, color string) (*models.Tag, error) {
	var tag models.Tag

	row := sq.Insert("tags").
		Columns("dashboard_id", `"text"`, "description", "color").
		Values(dashboardId, text, description, color).Suffix(`returning id, dashboard_id, "text", description, color`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&tag.Id, &tag.DashboardId, &tag.Text, &tag.Description, &tag.Color); err != nil {
		if duplicate := strings.Contains(err.Error(), "duplicate"); duplicate {
			return nil, repository.ErrDuplicateTag
		}
		return nil, err
	}

	return &tag, nil
}

func (r *Repository) CreateAndInsertTag(cardId string, dashboardId string, text string, description *string, color string) (*models.Tag, error) {
	var tag models.Tag

	tx, err := r.pool.Write().Begin()
	if err != nil {
		return nil, err
	}

	row := sq.Insert("tags").
		Columns("dashboard_id", `"text"`, "description", "color").
		Values(dashboardId, text, description, color).Suffix(`returning id, dashboard_id, "text", description, color`).
		RunWith(tx).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&tag.Id, &tag.DashboardId, &tag.Text, &tag.Description, &tag.Color); err != nil {
		if err := tx.Rollback(); err != nil {
			return nil, err
		}

		if duplicate := strings.Contains(err.Error(), "duplicate"); duplicate {
			return nil, repository.ErrDuplicateTag
		}
		return nil, err
	}

	_, err = sq.Insert("card_tags").
		Columns("card_id", "tag_id").
		Values(cardId, tag.Id).
		RunWith(tx).
		PlaceholderFormat(sq.Dollar).
		Exec()
	if err != nil {
		if err := tx.Rollback(); err != nil {
			return nil, err
		}

		if duplicate := strings.Contains(err.Error(), "duplicate"); duplicate {
			return nil, repository.ErrDuplicateCardTag
		}

		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &tag, nil
}

func (r *Repository) DeleteTag(tagId string) error {
	_, err := sq.Delete("tags").
		Where(sq.Eq{"id": tagId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()

	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) InsertCardTag(cardId string, tagId string) error {
	_, err := sq.Insert("card_tags").
		Columns("card_id", "tag_id").
		Values(cardId, tagId).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()

	if err != nil {
		if duplicate := strings.Contains(err.Error(), "duplicate"); duplicate {
			return repository.ErrDuplicateCardTag
		}

		return err
	}

	return nil
}

func (r *Repository) DeleteCardTag(cardId string, tagId string) error {
	_, err := sq.Delete("card_tags").
		Where(sq.Eq{"card_id": cardId, "tag_id": tagId}).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		Exec()

	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) UpdateTag(tagId string, text *string, description *string, color *string) (*models.Tag, error) {
	if text == nil && description == nil && color == nil {
		return nil, repository.ErrAllFieldsEmpty	
	}

	query := sq.Update("tags")

	if text != nil {
		query = query.Set(`"text"`, &text)
	}

	if description != nil {
		query = query.Set("description", &description)
	}

	if color != nil {
		query = query.Set("color", &color)
	}

	var tag models.Tag

	row := query.Where(sq.Eq{"id": tagId}).
		Suffix(`returning id, dashboard_id, "text", description, color`).
		RunWith(r.pool.Write()).
		PlaceholderFormat(sq.Dollar).
		QueryRow()
	if err := row.Scan(&tag.Id, &tag.DashboardId, &tag.Text, &tag.Description, &tag.Color); err != nil {
		return nil, err
	}

	return &tag, nil
}
