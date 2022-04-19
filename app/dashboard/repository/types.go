package pg

import "database/sql"

type PipelineRow struct {
	Id    sql.NullString
	Name  sql.NullString
	Order sql.NullInt64
}

type CardRow struct {
	Id         sql.NullString
	Name       sql.NullString
	Order      sql.NullInt64
	PipelineId sql.NullString
}

type FieldRow struct {
	Id         sql.NullString
	Name       sql.NullString
	Type       sql.NullString
	IsNullable sql.NullBool
}
