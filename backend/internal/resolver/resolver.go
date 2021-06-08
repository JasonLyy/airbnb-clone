package resolver

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
	"github.com/go-redis/redis/v7"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

func New(db *gorm.DB, rd *redis.Client, gs guest.GuestInterface, ls listing.ListingInterface) *Resolver {
	return &Resolver{
		db:             db,
		rd:             rd,
		guestService:   gs,
		listingService: ls,
	}
}

type Resolver struct {
	db             *gorm.DB
	rd             *redis.Client
	guestService   guest.GuestInterface
	listingService listing.ListingInterface
}
