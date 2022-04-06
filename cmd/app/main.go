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
	"github.com/ignavan39/ucrm-go/app"
	authUC "github.com/ignavan39/ucrm-go/app/auth/usecase"
	cardApi "github.com/ignavan39/ucrm-go/app/card/api"
	chatRepo "github.com/ignavan39/ucrm-go/app/chat/repository"
	"github.com/ignavan39/ucrm-go/app/middlewares"

	cardRepo "github.com/ignavan39/ucrm-go/app/card/repository"
	connectApi "github.com/ignavan39/ucrm-go/app/connect/api"
	contactApi "github.com/ignavan39/ucrm-go/app/contact/api"
	contactRepo "github.com/ignavan39/ucrm-go/app/contact/repository"
	"github.com/ignavan39/ucrm-go/app/core"
	dashboardApi "github.com/ignavan39/ucrm-go/app/dashboard/api"
	dashboardRepo "github.com/ignavan39/ucrm-go/app/dashboard/repository"
	pipelineApi "github.com/ignavan39/ucrm-go/app/pipeline/api"
	pipelineRepo "github.com/ignavan39/ucrm-go/app/pipeline/repository"

	dashboardSettingsRepo "github.com/ignavan39/ucrm-go/app/dashboard-settings/repository"
	userApi "github.com/ignavan39/ucrm-go/app/user/api"
	userRepo "github.com/ignavan39/ucrm-go/app/user/repository"
	userUc "github.com/ignavan39/ucrm-go/app/user/usecase"
	"github.com/ignavan39/ucrm-go/app/ws"

	conf "github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/pkg/pg"
	redisCache "github.com/ignavan39/ucrm-go/pkg/redis-cache"
	"github.com/ignavan39/ucrm-go/pkg/rmq"
	blogger "github.com/sirupsen/logrus"
)

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

	withLogger := false
	if config.Environment == conf.DevelopEnvironment {
		withLogger = true
	}

	rwConn, err := pg.NewReadAndWriteConnection(ctx, config.Database, config.Database, withLogger)
	if err != nil {
		blogger.Fatal(err.Error())
	}

	rabbitMqConn, err := rmq.NewConnection(
		config.RabbitMq.User,
		config.RabbitMq.Password,
		config.RabbitMq.Host,
		config.RabbitMq.Port,
	)
	if err != nil {
		blogger.Fatal(err.Error())
	}

	redis := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", config.Redis.Host, config.Redis.Port),
		Password: config.Redis.Password,
		DB:       config.Redis.DB,
	})

	cache := redisCache.NewRedisCache(redis, time.Minute*5, time.Minute*5, "cache")

	web := app.NewAPIServer(":8081").
		WithCors(config.Cors)

	userRepo := userRepo.NewRepository(rwConn)
	chatRepo := chatRepo.NewRepository(rwConn)
	dashboardRepo := dashboardRepo.NewRepository(rwConn)
	pipelineRepo := pipelineRepo.NewRepository(rwConn)
	cardRepo := cardRepo.NewRepository(rwConn)
	dashboardSettingsRepo := dashboardSettingsRepo.NewRepository(rwConn)

	mailgin := core.NewMailgunApi(*config)
	dispatcher := core.NewDispatcher(rabbitMqConn, chatRepo)
	authorizer := authUC.NewAuthUseCase(config.JWT.HashSalt, []byte(config.JWT.SigningKey), config.JWT.ExpireDuration)
	userController := userApi.NewController(userUc.NewUserUseCase(authorizer,userRepo,mailgin,config.Mail,*cache))
	dashboardController := dashboardApi.NewController(dashboardRepo, dashboardSettingsRepo)
	pipelineController := pipelineApi.NewController(pipelineRepo)
	cardController := cardApi.NewController(cardRepo, dashboardSettingsRepo)
	wsController := ws.NewController(dashboardRepo, dispatcher)
	connectController := connectApi.NewController(dispatcher, dashboardRepo, *config)
	contactController := contactApi.NewController(contactRepo.NewRepository(rwConn), cardRepo)

	pipelineAccessGuard := middlewares.NewPipelineAccessGuard(pipelineRepo)
	dashboardAccesGuard := middlewares.NewDashboardAccessGuard(dashboardRepo)
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
		dashboardApi.RegisterRouter(v1, dashboardController, *dashboardAccesGuard, *authGuard)
		pipelineApi.RegisterRouter(v1, pipelineController, *authGuard, *pipelineAccessGuard, *dashboardAccesGuard)
		cardApi.RegisterRouter(v1, cardController, *authGuard)
		ws.RegisterRouter(v1, wsController)
		connectApi.RegisterRouter(v1, connectController, *authGuard)
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

		dispatcher.Stop()
		go web.Stop()
		blogger.Info("[os.SIGNAL] done")
	}()
	web.WaitForDone()
}
