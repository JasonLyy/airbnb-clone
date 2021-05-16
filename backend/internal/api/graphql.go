package api

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/99designs/gqlgen/handler"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/resolver"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func GraphQl(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		config := generated.Config{
			Resolvers: resolver.New(),
		}

		h := handler.GraphQL(generated.NewExecutableSchema(config))
		h.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}

func GraphQlPlayground(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		h := playground.Handler("Playground", "/graphql")
		h.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
