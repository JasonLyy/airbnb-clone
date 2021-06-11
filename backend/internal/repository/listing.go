package repository

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"gorm.io/gorm"
)

type listingRepository struct {
	DB *gorm.DB
}

func NewListingRepository(db *gorm.DB) listingRepository {
	return listingRepository{
		DB: db,
	}
}

func (l listingRepository) FilteredListings(page model.PaginationInput, nights int, guests int, location string) ([]*model.Listing, error) {
	var listings []*model.Listing

	db, err := paginatedDb(l.DB, "id", page)
	if err != nil {
		return []*model.Listing{}, err
	}

	r := db.
		Where("minimum_nights <= ?", nights).
		Where("maximum_nights >= ?", nights).
		Where("accommodates > ?", guests).
		Where("neighbourhood LIKE ?", location).
		Find(&listings)
	if r.Error != nil {
		return []*model.Listing{}, r.Error
	}

	return listings, nil
}
