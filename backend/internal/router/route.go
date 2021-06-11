package router

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/controller"
	customMiddleware "github.com/JasonLyy/airbnb-clone/backend/internal/middleware"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
	"github.com/go-redis/redis/v7"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"gorm.io/gorm"
)

func Init(db *gorm.DB, rd *redis.Client, guestService guest.GuestService, listingService listing.ListingService) *echo.Echo {
	e := echo.New()

	//todo: refactor to use middleware wrappers around built in middleware
	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))
	e.Use(customMiddleware.Auth(auth.NewAuthService(rd), auth.NewTokenService(), repository.NewGuestRepository(db)))
	e.Use(middleware.Recover())
	e.Use()

	e.Any("/graphql", controller.GraphQl(db, rd, guestService, listingService))
	e.GET("/graphql/playground", controller.GraphQlPlayground())

	return e
}
