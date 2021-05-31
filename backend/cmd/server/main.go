package main

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/router"
)

func main() {
	db := db.Init()

	router := router.Init(db.DB)

	router.Logger.Fatal(router.Start(":8001"))
}
