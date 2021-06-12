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
	database := db.Init()
	redis := db.InitRedis()

	guestRepo := repository.NewGuestRepository(database.DB)
	listingRepo := repository.NewListingRepository(database.DB)
	reviewRepo := repository.NewReviewRepository(database.DB)

	authService := auth.NewAuthService(redis)
	tokenService := auth.NewTokenService()

	guestService := guest.NewGuestService(authService, tokenService, guestRepo)
	listingService := listing.NewListingService(listingRepo, reviewRepo)

	router := router.NewRouterService(authService, tokenService, guestService, listingService).Init()
	router.Logger.Fatal(router.Start(":8001"))
}
