package resolver

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/guest"
	"github.com/go-redis/redis/v7"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

func New(db *gorm.DB, rd *redis.Client, gs guest.GuestInterface) *Resolver {
	return &Resolver{
		db:           db,
		rd:           rd,
		guestService: gs,
	}
}

type Resolver struct {
	db           *gorm.DB
	rd           *redis.Client
	guestService guest.GuestInterface
}
