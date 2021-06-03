package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"math"

	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
)

func (r *listingResolver) Reviews(ctx context.Context, obj *model.Listing) (*int, error) {
	repo := repository.NewReviewRepository(r.db)

	reviews, e := repo.ListingTotalReviews(obj.ID)
	if e != nil {
		return nil, e
	}

	v := int(reviews)
	return &v, nil
}

func (r *listingResolver) Rating(ctx context.Context, obj *model.Listing) (*float64, error) {
	repo := repository.NewReviewRepository(r.db)

	rating, e := repo.ListingRating(obj.ID)
	if e != nil {
		return nil, e
	}

	return &rating, nil
}

func (r *queryResolver) Listings(ctx context.Context, page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error) {
	var guests int
	if input.Adults != nil {
		guests += *input.Adults
	}
	if input.Children != nil {
		guests += *input.Children
	}
	if input.Infants != nil {
		guests += *input.Infants
	}

	nights := int(math.Ceil(input.CheckOut.Sub(*input.CheckIn).Hours() / 24))

	repo := repository.NewListingRepository(r.db)
	listings, e := repo.FilteredListings(page, nights, guests, input.Location)
	if e != nil {
		return &model.ListingConnection{}, e
	}

	return listingsToConnection(listings, page, int64(len(listings))), nil
}

// Listing returns generated.ListingResolver implementation.
func (r *Resolver) Listing() generated.ListingResolver { return &listingResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type listingResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
