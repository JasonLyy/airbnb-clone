package resolver

import (
	"net/http"
	"time"

	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/labstack/echo/v4"
)

func SetAuthCookie(ctx echo.Context, token *auth.TokenDetails) {
	ctx.SetCookie(&http.Cookie{
		Name:     "access_token",
		Value:    token.AccessToken,
		HttpOnly: true,
		Expires:  time.Unix(token.AtExpires, 0),
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	})
	ctx.SetCookie(&http.Cookie{
		Name:     "refresh_token",
		Value:    token.RefreshToken,
		HttpOnly: true,
		Expires:  time.Unix(token.RtExpires, 0),
		Path:     "/auth",
		SameSite: http.SameSiteStrictMode,
	})
}

func ClearAuthCookie(ctx echo.Context) {
	ctx.SetCookie(&http.Cookie{
		Name:     "access_token",
		Value:    "",
		HttpOnly: true,
		Expires:  time.Unix(0, 0),
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	})
	ctx.SetCookie(&http.Cookie{
		Name:     "refresh_token",
		Value:    "",
		HttpOnly: true,
		Expires:  time.Unix(0, 0),
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	})
}
