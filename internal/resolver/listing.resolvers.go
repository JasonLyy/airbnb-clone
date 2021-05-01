package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone-server/internal/db"
	"github.com/JasonLyy/airbnb-clone-server/internal/generated"
	"github.com/JasonLyy/airbnb-clone-server/internal/model"
)

func (r *queryResolver) Listings(ctx context.Context) ([]*model.Listing, error) {
	listing := model.Listing{}
	return listing.GetAllListings(db.Db)
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
