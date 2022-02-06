package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/ignavan39/tm-go/app/api"
	"github.com/ignavan39/tm-go/app/config"
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

	web := api.NewAPIServer(":8080", *config, singleConn.Get())

	if err := web.Start(); err != nil {
		log.Fatal(err)
	}

	appCloser := make(chan os.Signal)
	signal.Notify(appCloser, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-appCloser
		log.Print("[os.SIGNAL] close request")
		go web.Stop()
		log.Print("[os.SIGNAL] done")
	}()

}
