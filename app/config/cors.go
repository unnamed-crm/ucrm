package config

type CorsConfig struct {
	AllowedOrigins     []string `json:"allowed_origins" yaml:"allowed_origins"`
	AllowedHeaders     []string `json:"allowed_headers" yaml:"allowed_headers"`
	AllowedMethods     []string `json:"allowed_methods" yaml:"allowed_methods"`
	ExposedHeaders     []string `json:"exposed_headers" yaml:"exposed_headers"`
	AllowCredentials   bool     `json:"allow_credentials" yaml:"allow_credentials"`
	OptionsPassthrough bool     `json:"options_passthrough" yaml:"options_passthrough"`
	DebugCors          bool     `json:"debug_cors" yaml:"debug_cors"`
	MaxAge             int      `json:"max_age" yaml:"max_age"`
	UseAllowAllHandler bool     `json:"use_allow_all_handler" yaml:"use_allow_all_handler"`
}
