package model

import (
	"time"

	"gorm.io/gorm"
)

type Review struct {
	ID         int64 `gorm:"primaryKey"`
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  gorm.DeletedAt `gorm:"index"`
	ReviewDate string
	Comment    string
	Rating     int64
	GuestID    int64
	ListingID  int64
}

// required for gqlgen to generate.
func (Review) IsNode() {}
