package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone/backend/internal/db"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

func (r *queryResolver) Listings(ctx context.Context, page model.PaginationInput) (*model.ListingConnection, error) {
	db, err := paginatedDb(db.Db, "listing_id", page)
	if err != nil {
		return &model.ListingConnection{PageInfo: &model.PageInfo{}}, err
	}

	var listings []*model.Listing
	if err := db.Find(&listings).Error; err != nil {
		return &model.ListingConnection{PageInfo: &model.PageInfo{}}, err
	}

	return listingsToConnection(listings, page), nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
