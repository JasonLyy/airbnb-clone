package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/resolver"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
	"github.com/labstack/echo/v4"
)

func GraphQl(gs guest.GuestService, ls listing.ListingService) echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		config := generated.Config{
			Resolvers: resolver.New(gs, ls, c),
		}

		c.Request().Header.Set("Content-Type", "application/json")

		srv := handler.NewDefaultServer(generated.NewExecutableSchema(config))
		srv.ServeHTTP(c.Response(), c.Request())

		return nil
	}
}

func GraphQlPlayground() echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		h := playground.Handler("Playground", "/backend/graphql")
		h.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}

func Auth(gs guest.GuestService, ls listing.ListingService, ts auth.TokenService) echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		rt, err := c.Cookie("refresh_token")
		if err != nil {
			return c.NoContent(http.StatusForbidden)
		}

		t, err := gs.RefreshToken(rt.Value)
		if err != nil {
			return c.NoContent(http.StatusForbidden)
		}

		c.SetCookie(&http.Cookie{
			Name:     "access_token",
			Value:    t.AccessToken,
			HttpOnly: true,
			Expires:  time.Unix(t.AtExpires, 0),
			Path:     "/",
			SameSite: http.SameSiteStrictMode,
		})
		c.SetCookie(&http.Cookie{
			Name:     "refresh_token",
			Value:    t.RefreshToken,
			HttpOnly: true,
			Expires:  time.Unix(t.RtExpires, 0),
			Path:     "/auth",
			SameSite: http.SameSiteStrictMode,
		})

		c.SetCookie(&http.Cookie{
			Name:     "access_token_exp",
			Value:    strconv.FormatInt(t.AtExpires, 10),
			HttpOnly: false,
			Expires:  time.Unix(t.AtExpires, 0),
			Path:     "/",
			SameSite: http.SameSiteStrictMode,
		})
		c.SetCookie(&http.Cookie{
			Name:     "refresh_token_exp",
			Value:    strconv.FormatInt(t.RtExpires, 10),
			HttpOnly: false,
			Expires:  time.Unix(t.RtExpires, 0),
			Path:     "/auth",
			SameSite: http.SameSiteStrictMode,
		})

		return c.JSON(http.StatusOK, model.AuthPayload{
			AccessToken:  t.AccessToken,
			RefreshToken: t.RefreshToken,
		})
	}
}

func Health() echo.HandlerFunc {
	return func(c echo.Context) (err error) {

		return c.JSON(http.StatusOK, model.AuthPayload{})
	}
}
