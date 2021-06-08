package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

func (r *listingResolver) Reviews(ctx context.Context, obj *model.Listing) (*int, error) {
	rv, err := r.listingService.Rating(obj.ID)
	reviews := int(rv)
	if err != nil {
		return &reviews, err
	}

	return &reviews, nil
}

func (r *listingResolver) Rating(ctx context.Context, obj *model.Listing) (*float64, error) {
	rating, err := r.listingService.Rating(obj.ID)
	if err != nil {
		return &rating, err
	}

	return &rating, nil
}

func (r *queryResolver) Listings(ctx context.Context, page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error) {
	return r.listingService.ListingConnection(page, input)
}

// Listing returns generated.ListingResolver implementation.
func (r *Resolver) Listing() generated.ListingResolver { return &listingResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type listingResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
