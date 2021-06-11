package repository

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"gorm.io/gorm"
)

type reviewRepository struct {
	DB *gorm.DB
}

func NewReviewRepository(db *gorm.DB) reviewRepository {
	return reviewRepository{
		DB: db,
	}
}

func (r reviewRepository) ListingRating(id int64) (float64, error) {
	var reviews []*model.Review
	var averageRating float64

	e := r.DB.
		Select("coalesce(avg(rating), ?) as averageRating", 0).
		Where("listing_id = ?", id).
		Find(&reviews).
		Row().
		Scan(&averageRating)
	if e != nil {
		return -1, e
	}

	return averageRating, nil
}

func (r reviewRepository) ListingTotalReviews(id int64) (int64, error) {
	var reviews []*model.Review

	var count int64
	result := r.DB.
		Select("id").
		Where("listing_id = ?", id).
		Model(&reviews).
		Count(&count)
	if result.Error != nil {
		return -1, result.Error
	}

	return count, nil
}
