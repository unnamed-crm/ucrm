package pg

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/jackc/pgx"
	"github.com/jackc/pgx/stdlib"
)

const pgDefaultMaxOpenConnections = 20

var ErrorConnection = errors.New("connections error")

type Config struct {
	User               string
	Password           string
	Host               string
	Port               uint16
	DB                 string
	MaxOpenConnections int
}

func (c *Config) MaxOpen() int {
	if c.MaxOpenConnections == 0 {
		return pgDefaultMaxOpenConnections
	}
	return c.MaxOpenConnections
}

type SingleConnection struct {
	conn *sql.DB
}

func (c *SingleConnection) Get() *sql.DB {
	return c.conn
}

func (s *SingleConnection) Close(ctx context.Context) error {
	return s.conn.Close()
}

func NewSingle(ctx context.Context, config Config) (*SingleConnection, error) {
	connConfig := pgx.ConnConfig{
		Host:     config.Host,
		Port:     config.Port,
		Database: config.DB,
		User:     config.User,
		Password: config.Password,
	}
	poolCfg := pgx.ConnPoolConfig{
		ConnConfig:     connConfig,
		MaxConnections: config.MaxOpen(),
	}
	pool, err := pgx.NewConnPool(poolCfg)
	if err != nil {
		return nil, fmt.Errorf("%w: pool %s", ErrorConnection, err)
	}
	db := stdlib.OpenDBFromPool(pool)
	return &SingleConnection{
		conn: db,
	}, nil
}
