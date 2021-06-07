package main

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
	"github.com/JasonLyy/airbnb-clone/backend/internal/router"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
)

func main() {
	database := db.Init()
	redis := db.InitRedis()

	guestRepo := repository.NewGuestRepository(database.DB)

	authService := auth.NewAuthService(redis)
	tokenService := auth.NewTokenService()
	guestService := guest.NewGuestService(authService, tokenService, guestRepo)

	router := router.Init(database.DB, redis, guestService)

	router.Logger.Fatal(router.Start(":8001"))
}
