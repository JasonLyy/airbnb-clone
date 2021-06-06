package router

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/controllers"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
	"github.com/go-redis/redis/v7"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"gorm.io/gorm"
)

func Init(db *gorm.DB, rd *redis.Client) *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))
	e.Use(auth.Auth(auth.NewAuthService(rd), auth.NewTokenService(), repository.NewGuestRepository(db)))

	e.Use(middleware.Recover())
	e.Use()

	e.Any("/graphql", controllers.GraphQl(db, rd))
	e.GET("/graphql/playground", controllers.GraphQlPlayground())

	return e
}
