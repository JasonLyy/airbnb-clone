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

	reviews, e := repo.ListingTotalReviews(obj.Id)
	if e != nil {
		return nil, e
	}

	v := int(reviews)
	return &v, nil
}

func (r *listingResolver) Rating(ctx context.Context, obj *model.Listing) (*float64, error) {
	repo := repository.NewReviewRepository(r.db)

	rating, e := repo.ListingRating(obj.Id)
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

//todo: need to explore how to make this more generic given that in Golang there is no generic :\
func listingsToConnection(listings []*model.Listing, page model.PaginationInput, count int64) *model.ListingConnection {
	if len(listings) == 0 {
		return &model.ListingConnection{PageInfo: &model.PageInfo{}}
	}

	pageInfo := model.PageInfo{}
	if page.First != nil {
		if len(listings) >= *page.First+1 {
			pageInfo.HasNextPage = true
			listings = listings[:len(listings)-1]
		}
	}

	listingEdges := make([]*model.ListingEdge, len(listings))
	for i, listing := range listings {
		cursor := encodeCursor(listing.Id)

		listingEdges[i] = &model.ListingEdge{
			Cursor: cursor,
			Node:   listing,
		}
	}

	// todo: need to check if this logic is correct
	if page.After != nil {
		pageInfo.HasPreviousPage = true
	}

	pageInfo.StartCursor = listingEdges[0].Cursor
	pageInfo.EndCursor = listingEdges[len(listingEdges)-1].Cursor

	return &model.ListingConnection{PageInfo: &pageInfo, Edges: listingEdges, TotalResults: int(count)}
}

// Listing returns generated.ListingResolver implementation.
func (r *Resolver) Listing() generated.ListingResolver { return &listingResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type listingResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
