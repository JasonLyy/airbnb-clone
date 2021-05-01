package model

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Listing struct {
	Id                    int64          `gorm:"primaryKey;column:listing_id" json:"listing_id"`
	Name                  string         `json:"name"`
	Description           string         `json:"description"`
	NeighbourhoodOverview string         `json:"neighbourhood_overview"`
	PictureUrl            string         `json:"picture_url"`
	Neighbourhood         string         `json:"neighbourhood"`
	NeighbourhoodCleansed string         `json:"neighbourhood_cleansed"`
	Latitude              float64        `json:"latitude"`
	Longitude             float64        `json:"longitude"`
	PropertyType          string         `json:"property_type"`
	RoomType              string         `json:"room_type"`
	Accommodates          int64          `json:"accommodates"`
	Bathrooms             int64          `json:"bathrooms"`
	BathroomsText         string         `json:"bathrooms_text"`
	Bedrooms              int64          `json:"bedrooms"`
	Beds                  int64          `json:"beds"`
	Amenities             pq.StringArray `json:"amenities" gorm:"type:varchar[]"`
	Price                 float64        `json:"price"`
	MinimumNights         int64          `json:"minimum_nights"`
	MaximumNights         int64          `json:"maximum_nights"`
	HostId                string         `json:"host"`
}

func (*Listing) TableName() string {
	return "listings"
}

func (*Listing) GetAllListings(db *gorm.DB) ([]*Listing, error) {
	var listings []*Listing

	err := db.Limit(10).Find(&listings).Error

	return listings, err
}
