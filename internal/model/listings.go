package model

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Listing struct {
	Id                    uint64         `gorm:"primary_key" json:"listing_id"`
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
	Accommodates          uint64         `json:"accommodates"`
	Bathrooms             uint64         `json:"bathrooms"`
	BathroomsText         string         `json:"bathrooms_text"`
	Bedrooms              uint64         `json:"bedrooms"`
	Beds                  uint64         `json:"beds"`
	Amenities             pq.StringArray `json:"amenities" gorm:"type:varchar[]"`
	Price                 float64        `json:"price"`
	MinimumNights         uint64         `json:"minimum_nights"`
	MaximumNights         uint64         `json:"maximum_nights"`
	HostId                string         `json:"host"`
}

func (*Listing) TableName() string {
	return "listings"
}

func (*Listing) GetAllListings(db *gorm.DB) (*[]Listing, error) {
	var listings []Listing

	err := db.Find(&listings).Error

	return &listings, err
}
