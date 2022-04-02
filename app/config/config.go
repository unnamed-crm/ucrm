package config

import (
	"fmt"
	"strings"

	"os"
	"strconv"
	"time"

	"github.com/ignavan39/ucrm-go/pkg/pg"
	blogger "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

const (
	DevelopEnironment    = "develop"
	ProductionEnironment = "production"
)

var environments = [...]string{DevelopEnironment, ProductionEnironment}

type MailLetter struct {
	Subject  string `yaml:"subject"`
	Template string `yaml:"template"`
}
type MailConfig struct {
	Sender  string                `yaml:"sender"`
	Letters map[string]MailLetter `yaml:"letters"`
}
type CoreConfig struct {
	Cors CorsConfig `yaml:"cors"`
	Mail MailConfig `yaml:"mail"`
}

type JWTConfig struct {
	HashSalt       string        `env:"JWT_HASH_SALT"`
	SigningKey     string        `env:"JWT_SIGNING_KEY"`
	ExpireDuration time.Duration `env:"JWT_EXPIRE_DURATION"`
}

type RedisConfig struct {
	Password string `env:"REDIS_PASSWORD"`
	Host     string `env:"REDIS_HOST"`
	Port     int    `env:"REDIS_PORT"`
	DB       int    `env:"REDIS_DB"`
}

type MailgunConfig struct {
	PrivateKey string `env:"MAILGUN_API_KEY"`
	Domain     string `env:"MAILGUN_DOMAIN"`
	PublicKey  string `env:"MAILGUN_PUBLIC_KEY"`
}

type Config struct {
	Database    pg.Config
	JWT         JWTConfig
	RabbitMq    RabbitMqConfig
	Redis       RedisConfig
	Cors        CorsConfig
	Evnironment string
	Mailgun     MailgunConfig
	Mail        MailConfig
}

func validateEnvironment(env string) bool {
	for _, e := range environments {
		if e == env {
			return true
		}
	}
	return false
}

func confFromFile(fileName string) (*CoreConfig, error) {
	blogger.Infoln(fmt.Sprintf("reading from %s", fileName))
	file, err := os.Open(fileName)
	if err != nil {
		return nil, err
	}

	var conf CoreConfig
	defer file.Close()
	if err := yaml.NewDecoder(file).Decode(&conf); err != nil {
		return nil, err
	}

	return &conf, nil
}

func GetConfig() (*Config, error) {
	port, err := strconv.ParseInt(os.Getenv("DATABASE_PORT"), 10, 16)
	if err != nil {
		return nil, err
	}

	expireDuration, err := time.ParseDuration(os.Getenv("JWT_EXPIRE_DURATION"))
	if err != nil {
		return nil, err
	}

	environment := strings.ToLower(os.Getenv("ENVIRONMENT"))
	if len(environment) == 0 {
		environment = DevelopEnironment
	}
	finded := validateEnvironment(environment)
	if !finded {
		return nil, fmt.Errorf("[Environment] Undeclared name :%s", environment)
	}

	pgCong := pg.Config{
		Password: os.Getenv("DATABASE_PASS"),
		Host:     os.Getenv("DATABASE_HOST"),
		User:     os.Getenv("DATABASE_USER"),
		Port:     uint16(port),
		DB:       os.Getenv("DATABASE_NAME"),
	}

	rmq := RabbitMqConfig{
		Password: os.Getenv("RABBITMQ_PASSWORD"),
		Host:     os.Getenv("RABBITMQ_HOST"),
		User:     os.Getenv("RABBITMQ_USER"),
		Port:     os.Getenv("RABBITMQ_PORT"),
	}

	mailgun := MailgunConfig{
		Domain:     os.Getenv("MAILGUN_DOMAIN"),
		PrivateKey: os.Getenv("MAILGUN_API_KEY"),
		PublicKey:  os.Getenv("MAILGUN_PUBLIC_KEY"),
	}

	redisPort, err := strconv.ParseInt(os.Getenv("REDIS_PORT"), 10, 16)
	if err != nil {
		return nil, err
	}
	redisDb, err := strconv.ParseInt(os.Getenv("REDIS_DB"), 10, 16)
	if err != nil {
		return nil, err
	}
	redis := RedisConfig{
		Host:     os.Getenv("REDIS_HOST"),
		Password: os.Getenv("REDIS_PASSWORD"),
		Port:     int(redisPort),
		DB:       int(redisDb),
	}
	coreConf, err := confFromFile("./usr/local/bin/app/develop.yml")
	if err != nil {
		return nil, err
	}

	return &Config{
		Database: pgCong,
		JWT: JWTConfig{
			HashSalt:       os.Getenv("JWT_HASH_SALT"),
			SigningKey:     os.Getenv("JWT_SIGNING_KEY"),
			ExpireDuration: expireDuration,
		},
		RabbitMq:    rmq,
		Redis:       redis,
		Cors:        coreConf.Cors,
		Mail:        coreConf.Mail,
		Evnironment: environment,
		Mailgun:     mailgun,
	}, nil
}
