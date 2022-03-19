package config

type RabbitMqConfig struct {
	User     string `yaml:"user" env:"RABBITMQ_USER"`
	Password string `yaml:"password" env:"RABBITMQ_PASSWORD"`
	Host     string `yaml:"host" env:"RABBITMQ_HOST"`
	Port     string `yaml:"port" env:"RABBITMQ_PORT"`
	Salt     string `yaml:"salt" env:"RABBITMQ_QUEUE_SALT"`
}
