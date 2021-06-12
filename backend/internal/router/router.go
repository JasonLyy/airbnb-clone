package router

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/controller"
	customMiddleware "github.com/JasonLyy/airbnb-clone/backend/internal/middleware"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type routerService struct {
	as auth.AuthService
	ts auth.TokenService
	gs guest.GuestService
	ls listing.ListingService
}

func NewRouterService(as auth.AuthService, ts auth.TokenService, gs guest.GuestService, ls listing.ListingService) *routerService {
	return &routerService{
		as: as,
		ts: ts,
		gs: gs,
		ls: ls,
	}
}

func (r routerService) Init() *echo.Echo {
	e := echo.New()

	//todo: refactor to use middleware wrappers around built in middleware
	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))
	e.Use(customMiddleware.Auth(r.as, r.ts, r.gs))
	e.Use(middleware.Recover())
	e.Use()

	e.Any("/graphql", controller.GraphQl(r.gs, r.ls))
	e.GET("/graphql/playground", controller.GraphQlPlayground())

	return e
}