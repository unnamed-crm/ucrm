package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi"
	chim "github.com/go-chi/chi/middleware"
	"github.com/go-redis/redis/v8"
	"github.com/jackc/pgx"
	"github.com/jackc/pgx/log/logrusadapter"
	"ucrm/app"
	authUC "ucrm/app/auth/usecase"
	cardApi "ucrm/app/card/api"
	cardRepo "ucrm/app/card/repository"
	contactApi "ucrm/app/contact/api"
	contactRepo "ucrm/app/contact/repository"
	dashboardApi "ucrm/app/dashboard/api"
	dashboardRepo "ucrm/app/dashboard/repository"
	"ucrm/app/middlewares"
	pipelineApi "ucrm/app/pipeline/api"
	pipelineRepo "ucrm/app/pipeline/repository"
	"ucrm/app/swagger"

	dashboardSettingsRepo "ucrm/app/dashboard-settings/repository"
	userApi "ucrm/app/user/api"
	userRepo "ucrm/app/user/repository"

	blogger "github.com/sirupsen/logrus"
	conf "ucrm/app/config"
	_ "ucrm/docs"
	"ucrm/pkg/pg"
	redisCache "ucrm/pkg/redis-cache"
)

// @title                       Unnamed URCM
// @version                     1.0
// @description                 Unnamed URCM
// @securityDefinitions.apiKey  JWT
// @in                          header
// @name                        Authorization
func main() {
	blogger.SetOutput(os.Stdout)
	blogger.SetFormatter(&blogger.TextFormatter{})

	ctx := context.Background()
	config, err := conf.GetConfig()
	if err != nil {
		blogger.Fatal(err.Error())
	}

	if config.Environment == conf.DevelopEnvironment {
		time.Sleep(15 * time.Second)
	}

	var pgLogger pgx.Logger
	if config.Environment == conf.DevelopEnvironment {
		pgLogger = logrusadapter.NewLogger(blogger.New())
	}

	rwConn, err := pg.NewReadAndWriteConnection(ctx, config.Database, config.Database, pgLogger)
	if err != nil {
		blogger.Fatal(err.Error())
	}

	blogger.Infof("database connection established")

	redis := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", config.Redis.Host, config.Redis.Port),
		Password: config.Redis.Password,
		DB:       config.Redis.DB,
	})

	blogger.Infof("redis connection established")

	cache := redisCache.NewRedisCache(redis, time.Minute*5, time.Minute*5, "cache")

	web := app.NewAPIServer(":8081").
		WithCors(config.Cors)

	userRepo := userRepo.NewRepository(rwConn)
	dashboardRepo := dashboardRepo.NewRepository(rwConn)
	pipelineRepo := pipelineRepo.NewRepository(rwConn)
	cardRepo := cardRepo.NewRepository(rwConn)
	dashboardSettingsRepo := dashboardSettingsRepo.NewRepository(rwConn)

	authorizer := authUC.NewAuthUseCase(config.JWT.HashSalt, []byte(config.JWT.SigningKey), config.JWT.ExpireDuration)
	userController := userApi.NewController(authorizer, userRepo, config.Mail, *cache)
	dashboardController := dashboardApi.NewController(dashboardRepo, dashboardSettingsRepo)
	pipelineController := pipelineApi.NewController(pipelineRepo)
	cardController := cardApi.NewController(cardRepo, dashboardSettingsRepo)
	contactController := contactApi.NewController(contactRepo.NewRepository(rwConn), cardRepo)

	pipelineAccessGuard := middlewares.NewPipelineAccessGuard(pipelineRepo)
	dashboardAccesGuard := middlewares.NewDashboardAccessGuard(dashboardRepo)
	customFieldGuard := middlewares.NewCustomFieldGuard(dashboardRepo)
	authGuard := middlewares.NewAuthGuard(config.JWT)

	web.Router().Route("/api/v1", func(v1 chi.Router) {
		if config.Environment == conf.DevelopEnvironment {
			v1.Use(
				chim.Logger,
				chim.RequestID,
			)
		}
		v1.Use(
			chim.Recoverer,
		)
		userApi.RegisterRouter(v1, userController)
		dashboardApi.RegisterRouter(v1, dashboardController, *dashboardAccesGuard, *customFieldGuard, *authGuard)
		pipelineApi.RegisterRouter(v1, pipelineController, *authGuard, *pipelineAccessGuard, *dashboardAccesGuard)
		cardApi.RegisterRouter(v1, cardController, *authGuard)
		swagger.RegisterRouter(v1)
		contactApi.RegisterRouter(v1, contactController, *authGuard)
	})

	if err := web.Start(); err != nil {
		blogger.Fatalf("API Server crashed with error :[%s]", err.Error())
	}
	blogger.Infof("API server has been started...")

	appCloser := make(chan os.Signal)
	signal.Notify(appCloser, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-appCloser
		blogger.Info("[os.SIGNAL] close request")

		go web.Stop()
		blogger.Info("[os.SIGNAL] done")
	}()
	web.WaitForDone()
}
