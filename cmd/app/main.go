package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi"
	chim "github.com/go-chi/chi/middleware"
	"github.com/ignavan39/ucrm-go/app/api"
	"github.com/ignavan39/ucrm-go/app/api/cards"
	"github.com/ignavan39/ucrm-go/app/api/connect"
	"github.com/ignavan39/ucrm-go/app/api/contact"
	"github.com/ignavan39/ucrm-go/app/api/dashboards"
	"github.com/ignavan39/ucrm-go/app/api/pipelines"
	"github.com/ignavan39/ucrm-go/app/api/users"
	"github.com/ignavan39/ucrm-go/app/core"

	"github.com/ignavan39/ucrm-go/app/api/ws"
	"github.com/ignavan39/ucrm-go/app/auth"
	conf "github.com/ignavan39/ucrm-go/app/config"
	"github.com/ignavan39/ucrm-go/app/repository/database"
	"github.com/ignavan39/ucrm-go/pkg/pg"
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

	web := api.NewAPIServer(":8081").
		WithCors(config.Cors)
	dbService := database.NewDbService(rwConn)

	dispatcher := core.NewDispatcher(rabbitMqConn, dbService)
	authorizer := auth.NewAuthorizer(config.JWT.HashSalt, []byte(config.JWT.SigningKey), config.JWT.ExpireDuration)
	userController := users.NewController(authorizer, dbService)
	dashboardController := dashboards.NewController(dbService, dbService)
	pipelineController := pipelines.NewController(dbService)
	cardController := cards.NewController(dbService, dbService)
	wsController := ws.NewController(dbService, dispatcher)
	connectController := connect.NewController(dispatcher, dbService, *config)
	contactController := contact.NewController(dbService, dbService)

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
		users.RegisterRouter(v1, userController)
		dashboards.RegisterRouter(v1, dashboardController, dbService, config.JWT)
		pipelines.RegisterRouter(v1, pipelineController, dbService, dbService, config.JWT)
		cards.RegisterRouter(v1, cardController, dbService, config.JWT)
		ws.RegisterRouter(v1, wsController)
		connect.RegisterRouter(v1, connectController, config.JWT)
		contact.RegisterRouter(v1, contactController, dbService, config.JWT)
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
