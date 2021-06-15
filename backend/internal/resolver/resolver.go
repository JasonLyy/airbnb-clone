package resolver

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
	"github.com/labstack/echo/v4"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

func New(gs guest.GuestService, ls listing.ListingService, ctx echo.Context) *Resolver {
	return &Resolver{
		guestService:   gs,
		listingService: ls,
		echoCtx:        ctx,
	}
}

type Resolver struct {
	guestService   guest.GuestService
	listingService listing.ListingService
	echoCtx        echo.Context
}
