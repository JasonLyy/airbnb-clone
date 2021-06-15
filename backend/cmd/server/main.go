package main

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
	"github.com/JasonLyy/airbnb-clone/backend/internal/router"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
)

func main() {
	database := db.InitDb()
	redis := db.InitRedis()

	guestRepo := repository.NewGuestRepository(database)
	listingRepo := repository.NewListingRepository(database)
	reviewRepo := repository.NewReviewRepository(database)

	tokenService := auth.NewTokenService()
	authService := auth.NewAuthService(redis, tokenService)

	guestService := guest.NewGuestService(authService, tokenService, guestRepo)
	listingService := listing.NewListingService(listingRepo, reviewRepo)

	router := router.NewRouterService(authService, tokenService, guestService, listingService).Init()
	router.Logger.Fatal(router.Start(":8001"))
}
