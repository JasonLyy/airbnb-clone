package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math"

	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

func (r *listingResolver) Reviews(ctx context.Context, obj *model.Listing) (*int, error) {
	var reviews []*model.Review
	var count int64

	results := db.Db.
		Select("review_id").
		Where("listing_id = ?", obj.Id).
		Model(&reviews).
		Count(&count)
	if results.Error != nil {
		return nil, results.Error
	}

	intCount := int(count)
	return &intCount, nil
}

func (r *listingResolver) Rating(ctx context.Context, obj *model.Listing) (*float64, error) {
	var reviews []*model.Review
	var averageRating float64

	err := db.Db.
		Select("avg(rating) as averageRating").
		Where("listing_id = ?", obj.Id).
		Find(&reviews).
		Row().
		Scan(&averageRating)

	if err != nil {
		return nil, err
	}

	return &averageRating, nil
}

func (r *queryResolver) Listings(ctx context.Context, page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error) {
	db, err := paginatedDb(db.Db, "listing_id", page)
	if err != nil {
		return &model.ListingConnection{PageInfo: &model.PageInfo{}}, err
	}

	var guestsCount int
	if input.Adults != nil {
		guestsCount += *input.Adults
	}
	if input.Children != nil {
		guestsCount += *input.Children
	}
	if input.Infants != nil {
		guestsCount += *input.Infants
	}

	numberOfRequestDayToStay := int(math.Ceil(input.CheckOut.Sub(*input.CheckIn).Hours() / 24))

	fmt.Println(numberOfRequestDayToStay)
	var listings []*model.Listing
	results :=
		db.
			Where("minimum_nights <= ?", numberOfRequestDayToStay).
			Where("maximum_nights >= ?", numberOfRequestDayToStay).
			Where("accommodates > ?", guestsCount).
			Where("neighbourhood LIKE ?", input.Location).
			Find(&listings)

	if results.Error != nil {
		return &model.ListingConnection{PageInfo: &model.PageInfo{}}, err
	}

	var count int64
	results.Count(&count)

	return listingsToConnection(listings, page, count), nil
}

// Listing returns generated.ListingResolver implementation.
func (r *Resolver) Listing() generated.ListingResolver { return &listingResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type listingResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
