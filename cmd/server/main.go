package main

import (
	"github.com/JasonLyy/airbnb-clone-server/internal/db"
	"github.com/JasonLyy/airbnb-clone-server/internal/router"
)

func main() {
	db.Init()

	router := router.Init(db.Db)

	router.Logger.Fatal(router.Start(":8001"))
}
