package router

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func Init(db *gorm.DB) *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))
	// e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Any("/graphql", controllers.GraphQl(db))
	e.GET("/graphql/playground", controllers.GraphQlPlayground(db))

	return e
}
