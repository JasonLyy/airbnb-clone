package middleware

import (
	"context"
	"net/http"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/labstack/echo/v4"
)

var userCtxKey = &userContextKey{"user"}
var accessTokenCtxKey = &accessTokenContextKey{"access_token"}

type userContextKey struct {
	name string
}
type accessTokenContextKey struct {
	name string
}

func Auth(a auth.AuthService, t auth.TokenService, g guest.GuestService) func(echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			at, err := c.Cookie("access_token")
			if err != nil {
				return next(c)
			}

			tokenString := at.Value

			token, err := t.ParseToken(tokenString)
			if err != nil {
				return next(c)
			}

			access, err := t.GetAccessDetailsFromToken(token)
			if err != nil {
				return echo.NewHTTPError(http.StatusForbidden, "Unauthorized")
			}

			userId, err := a.FetchAuthUser(access)
			if err != nil {
				return echo.NewHTTPError(http.StatusForbidden, "Unauthorized")
			}

			guest, err := g.FindGuest(userId)
			if err != nil {
				return echo.NewHTTPError(http.StatusForbidden, "Unauthorized")
			}

			ctxWithUser := context.WithValue(c.Request().Context(), userCtxKey, guest)
			ctxWithUserAndAt := context.WithValue(ctxWithUser, accessTokenCtxKey, &tokenString)

			req := c.Request().WithContext(ctxWithUserAndAt)
			c.SetRequest(req)

			return next(c)
		}
	}
}

func ContextUser(ctx context.Context) *model.Guest {
	raw, _ := ctx.Value(userCtxKey).(*model.Guest)
	return raw
}

func ContextAccessToken(ctx context.Context) *string {
	raw, _ := ctx.Value(accessTokenCtxKey).(*string)
	return raw
}
