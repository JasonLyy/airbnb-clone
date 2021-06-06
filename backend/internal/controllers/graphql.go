package controllers

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/resolver"
	"github.com/go-redis/redis/v7"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func GraphQl(db *gorm.DB, rd *redis.Client) echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		config := generated.Config{
			Resolvers: resolver.New(db, rd),
		}

		c.Request().Header.Set("Content-Type", "application/json")

		srv := handler.NewDefaultServer(generated.NewExecutableSchema(config))
		srv.ServeHTTP(c.Response(), c.Request())

		return nil
	}
}

func GraphQlPlayground() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		h := playground.Handler("Playground", "/graphql")
		h.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
