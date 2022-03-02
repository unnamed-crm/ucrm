package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-chi/chi"
	chim "github.com/go-chi/chi/middleware"
	"github.com/ignavan39/tm-go/app/api"
	"github.com/ignavan39/tm-go/app/api/dashboards"
	"github.com/ignavan39/tm-go/app/api/users"
	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/config"
	"github.com/ignavan39/tm-go/app/repository/database"
	"github.com/ignavan39/tm-go/pkg/pg"
)

func main() {
	ctx := context.Background()
	config, err := config.GetConfig()

	if err != nil {
		log.Fatal(err)
	}

	singleConn, err := pg.NewSingle(ctx, config.Database)

	if err != nil {
		log.Fatal(err)
	}

	web := api.NewAPIServer(":8080", *config)

	dbService := database.NewDbService(singleConn.Get())
	authorizer := auth.NewAuthorizer(config.JWT.HashSalt, []byte(config.JWT.SingingKey), config.JWT.ExpireDuration)
	userController := users.NewController(authorizer, dbService)
	dashboardController := dashboards.NewController(dbService)

	web.Router().Route("/api/v1", func(v1 chi.Router) {
		v1.Use(
			chim.Logger,
			chim.Recoverer,
		)
		users.RegisterUserRouter(v1, userController)
		dashboards.RegisterDashboardRouter(v1, dashboardController)
	})
	web.Start()

	appCloser := make(chan os.Signal)
	signal.Notify(appCloser, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-appCloser
		log.Print("[os.SIGNAL] close request")
		go web.Stop()
		log.Print("[os.SIGNAL] done")
	}()

}
