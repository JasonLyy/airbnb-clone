package model

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Host struct {
	ID               int64 `gorm:"primaryKey"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        gorm.DeletedAt `gorm:"index"`
	Url              string
	FirstName        string
	Since            *time.Time
	Location         string
	About            string
	IsSuperhost      string
	ThumbnailUrl     string
	PictureUrl       string
	Neighbourhood    string
	Verifications    []pq.StringArray
	IdentityVerified bool
	Listings         []Listing
}

// required for gqlgen to generate.
func (Host) IsNode() {}
