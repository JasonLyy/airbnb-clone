package auth

import (
	"context"
	"net/http"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
	"github.com/labstack/echo/v4"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

func Auth(a AuthInterface, t TokenInterface, g repository.GuestRepository) func(echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			tokenString := t.ExtractToken(c.Request())
			if len(tokenString) == 0 {
				return next(c)
			}

			access, err := t.GetAccessDetailsFromToken(tokenString)
			if err != nil {
				return echo.NewHTTPError(http.StatusForbidden, "Unauthorized")
			}

			userId, err := a.FetchAuthUser(access)
			if err != nil {
				return echo.NewHTTPError(http.StatusForbidden, "Unauthorized")
			}

			guest, err := g.FindGuestById(userId)
			if err != nil {
				return echo.NewHTTPError(http.StatusForbidden, "Unauthorized")
			}

			ctx := context.WithValue(c.Request().Context(), userCtxKey, guest)
			req := c.Request().WithContext(ctx)
			c.SetRequest(req)

			return next(c)
		}
	}
}

func ForContext(ctx context.Context) *model.Guest {
	raw, _ := ctx.Value(userCtxKey).(*model.Guest)
	return raw
}
