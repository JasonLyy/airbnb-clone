package main

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/router"
)

func main() {
	db.Init()

	router := router.Init(db.Db)

	router.Logger.Fatal(router.Start(":8001"))
}
