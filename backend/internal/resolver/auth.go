package resolver

import (
	"net/http"
	"strconv"
	"time"

	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/labstack/echo/v4"
)

func SetAuthCookie(ctx echo.Context, t *auth.TokenDetails) {
	ctx.SetCookie(&http.Cookie{
		Name:     "access_token",
		Value:    t.AccessToken,
		HttpOnly: true,
		Expires:  time.Unix(t.AtExpires, 0),
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	})
	ctx.SetCookie(&http.Cookie{
		Name:     "refresh_token",
		Value:    t.RefreshToken,
		HttpOnly: true,
		Expires:  time.Unix(t.RtExpires, 0),
		Path:     "/auth",
		SameSite: http.SameSiteStrictMode,
	})

	ctx.SetCookie(&http.Cookie{
		Name:     "access_token_exp",
		Value:    strconv.FormatInt(t.AtExpires, 10),
		HttpOnly: false,
		Expires:  time.Unix(t.AtExpires, 0),
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	})
	ctx.SetCookie(&http.Cookie{
		Name:     "refresh_token_exp",
		Value:    strconv.FormatInt(t.RtExpires, 10),
		HttpOnly: false,
		Expires:  time.Unix(t.RtExpires, 0),
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
		Path:     "/auth",
		SameSite: http.SameSiteStrictMode,
	})

	ctx.SetCookie(&http.Cookie{
		Name:     "access_token_exp",
		Value:    "",
		HttpOnly: false,
		Expires:  time.Unix(0, 0),
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	})
	ctx.SetCookie(&http.Cookie{
		Name:     "refresh_token_exp",
		Value:    "",
		HttpOnly: false,
		Expires:  time.Unix(0, 0),
		Path:     "/auth",
		SameSite: http.SameSiteStrictMode,
	})
}
