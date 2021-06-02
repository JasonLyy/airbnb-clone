package main

import (
	"fmt"
	"os"
	"path"

	"github.com/JasonLyy/airbnb-clone/backend/internal/migrations"
)

func main() {
	cwd, err := os.Getwd()
	if err != nil {
		panic("Can't get working directory")
	}

	// look into reflections to get key of structs of defined models
	m := migrations.Migrations{
		Migrations: []migrations.Migration{
			{
				TableName: "guests",
				Dir:       path.Join(cwd, "db/fixtures/guests.csv"),
				Columns: []string{
					"guest_id",
					"first_name",
				},
			},
			{
				TableName: "hosts",
				Dir:       path.Join(cwd, "db/fixtures/hosts.csv"),
				Columns: []string{
					"host_id",
					"url",
					"first_name",
					"since",
					"location",
					"about",
					"is_superhost",
					"thumbnail_url",
					"picture_url",
					"neighbourhood",
					"verifications",
					"identity_verified",
				},
			},
			{
				TableName: "listings",
				Dir:       path.Join(cwd, "db/fixtures/listings.csv"),
				Columns: []string{
					"listing_id",
					"name",
					"description",
					"neighbourhood_overview",
					"picture_url",
					"neighbourhood",
					"neighbourhood_cleansed",
					"latitude",
					"longitude",
					"property_type",
					"room_type",
					"accommodates",
					"bathrooms",
					"bathrooms_text",
					"bedrooms",
					"beds",
					"amenities",
					"price",
					"minimum_nights",
					"maximum_nights",
					"host_id",
				},
			},
			{
				TableName: "reviews",
				Dir:       path.Join(cwd, "db/fixtures/reviews_1.csv"),
				Columns: []string{
					"review_id",
					"review_date",
					"comment",
					"rating",
					"guest_id",
					"listing_id",
				},
			},
			{
				TableName: "reviews",
				Dir:       path.Join(cwd, "db/fixtures/reviews_2.csv"),
				Columns: []string{
					"review_id",
					"review_date",
					"comment",
					"rating",
					"guest_id",
					"listing_id",
				},
			},
		},
	}

	result := m.Migrate()
	fmt.Println(result)
}
