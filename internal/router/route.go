package router

import (
	"github.com/JasonLyy/airbnb-clone-server/internal/api"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func Init(db *gorm.DB) *echo.Echo {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/homes", api.GetListings(db))

	return e
}
