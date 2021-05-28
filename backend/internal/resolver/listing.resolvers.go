package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

func (r *listingResolver) Reviews(ctx context.Context, obj *model.Listing) (*int, error) {
	val := 45
	return &val, nil
}

func (r *listingResolver) Rating(ctx context.Context, obj *model.Listing) (*float64, error) {
	val := 4.68
	return &val, nil
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

	var listings []*model.Listing
	results := db.Where("accommodates > ?", guestsCount).Where("neighbourhood LIKE ?", input.Location).Find(&listings)
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
