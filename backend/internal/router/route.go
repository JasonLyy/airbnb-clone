package router

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/api"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func Init(db *gorm.DB) *echo.Echo {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.POST("/graphql", api.GraphQl(db))
	e.GET("/graphql/playground", api.GraphQlPlayground(db))

	return e
}
