package model

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Listing struct {
	ID                    int64 `gorm:"primaryKey"`
	CreatedAt             time.Time
	UpdatedAt             time.Time
	DeletedAt             gorm.DeletedAt `gorm:"index"`
	Name                  string
	Description           string
	NeighbourhoodOverview string
	PictureUrl            string
	Neighbourhood         string
	NeighbourhoodCleansed string
	Latitude              float64
	Longitude             float64
	PropertyType          string
	RoomType              string
	Accommodates          int64
	Bathrooms             int64
	BathroomsText         string
	Bedrooms              int64
	Beds                  int64
	Amenities             pq.StringArray `gorm:"type:varchar[]"`
	Price                 float64
	MinimumNights         int64
	MaximumNights         int64
	Reviews               []Review
	HostID                int64
}

// required for gqlgen to generate.
func (Listing) IsNode() {}
