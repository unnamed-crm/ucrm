package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-chi/chi"
	"github.com/ignavan39/tm-go/app/api"
	"github.com/ignavan39/tm-go/app/api/users"
	"github.com/ignavan39/tm-go/app/auth"
	"github.com/ignavan39/tm-go/app/config"
	"github.com/ignavan39/tm-go/app/repo"
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

	repository := repo.NewRepository(singleConn.Get())
	authorizer := auth.NewAuthorizer(config.JWT.HashSalt, []byte(config.JWT.SingingKey), config.JWT.ExpireDuration)
	userController := users.NewUserController(authorizer, *repository)

	web.Router().Route("/api/v1", func(v1 chi.Router) {
		users.RegisterUserRouter(v1, userController)
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
