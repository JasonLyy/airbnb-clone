package main

import (
	"github.com/JasonLyy/airbnb-clone-server/internal/db"
	"github.com/JasonLyy/airbnb-clone-server/internal/router"
	"gorm.io/gorm"
)

type Listings struct {
	gorm.Model            `json:"model"`
	Id                    uint64   `gorm:"primary_key" json:"listing_id"`
	Name                  string   `json:"name"`
	Description           string   `json:"description"`
	NeighbourhoodOverview string   `json:"neighbourhood_overview"`
	PictureUrl            string   `json:"picture_url"`
	Neighbourhood         string   `json:"neighbourhood"`
	NeighbourhoodCleansed string   `json:"neighbourhood_cleansed"`
	Latitude              float64  `json:"latitude"`
	Longitude             float64  `json:"longitude"`
	PropertyType          string   `json:"property_type"`
	RoomType              string   `json:"room_type"`
	Accommodates          uint64   `json:"accommodates"`
	Bathrooms             uint64   `json:"bathrooms"`
	BathroomsText         uint64   `json:"bathrooms_text"`
	Bedrooms              uint64   `json:"bedrooms"`
	Beds                  uint64   `json:"beds"`
	Amenities             []string `json:"amenities"`
	Price                 float64  `json:"price"`
	MinimumNights         uint64   `json:"minimum_nights"`
	MaximumNights         uint64   `json:"maximum_nights"`
	HostId                string   `json:"host"`
}

func main() {
	db.Init()

	router := router.Init(db.Db)

	router.Logger.Fatal(router.Start(":8001"))
}
