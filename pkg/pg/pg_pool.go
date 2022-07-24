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

type Pool interface {
	Read() *sql.DB
	Write() *sql.DB
}
type SingleConnection struct {
	conn *sql.DB
}

func (c *SingleConnection) Read() *sql.DB {
	return c.conn
}

func (c *SingleConnection) Write() *sql.DB {
	return c.conn
}

func (s *SingleConnection) Close(ctx context.Context) error {
	return s.conn.Close()
}

func NewSingle(ctx context.Context, config Config, logger pgx.Logger) (*SingleConnection, error) {
	db, err := OpenDb(config, logger)
	if err != nil {
		return nil, err
	}
	return &SingleConnection{
		conn: db,
	}, nil
}

type ReadAndWriteConnection struct {
	read  *sql.DB
	write *sql.DB
}

func NewReadAndWriteConnection(ctx context.Context, read Config, write Config, logger pgx.Logger) (*ReadAndWriteConnection, error) {
	w, err := OpenDb(read, logger)
	if err != nil {
		return nil, err
	}

	r, err := OpenDb(write, logger)
	if err != nil {
		return nil, err
	}

	return &ReadAndWriteConnection{
		write: w,
		read:  r,
	}, nil
}

func (r *ReadAndWriteConnection) Read() *sql.DB {
	return r.read
}

func (r *ReadAndWriteConnection) Write() *sql.DB {
	return r.write
}

func OpenDb(config Config, logger pgx.Logger) (*sql.DB, error) {
	var connConfig pgx.ConnConfig
	if logger != nil {
		connConfig = pgx.ConnConfig{
			Host:     config.Host,
			Port:     config.Port,
			Database: config.DB,
			LogLevel: 4,
			Logger:   logger,
			User:     config.User,
			Password: config.Password,
		}
	} else {
		connConfig = pgx.ConnConfig{
			Host:     config.Host,
			Port:     config.Port,
			Database: config.DB,
			User:     config.User,
			Password: config.Password,
		}
	}

	poolCfg := pgx.ConnPoolConfig{
		ConnConfig:     connConfig,
		MaxConnections: config.MaxOpen(),
	}

	pool, err := pgx.NewConnPool(poolCfg)
	if err != nil {
		return nil, fmt.Errorf("%w: pool %s", ErrorConnection, err)
	}

	return stdlib.OpenDBFromPool(pool), nil
}
