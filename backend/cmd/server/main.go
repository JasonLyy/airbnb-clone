package main

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/router"
)

func main() {
	database := db.Init()
	redis := db.InitRedis()

	router := router.Init(database.DB, redis)

	router.Logger.Fatal(router.Start(":8001"))
}
