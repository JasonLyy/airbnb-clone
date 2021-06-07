package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

func (r *mutationResolver) CreateGuest(ctx context.Context, input model.CredentialsInput) (*model.AuthPayload, error) {
	auth, err := r.guestService.CreateGuest(input)
	if err != nil {
		return &model.AuthPayload{}, nil
	}

	return auth, nil
}

func (r *mutationResolver) LoginGuest(ctx context.Context, input model.CredentialsInput) (*model.AuthPayload, error) {
	auth, err := r.guestService.LoginGuest(input)
	if err != nil {
		return &model.AuthPayload{}, nil
	}

	return auth, nil
}

func (r *mutationResolver) LogoutGuest(ctx context.Context, accessToken string) (*model.LogoutPayload, error) {
	l, err := r.guestService.LogoutGuest(accessToken)
	if err != nil {
		return &model.LogoutPayload{}, nil
	}

	return l, nil
}

func (r *mutationResolver) RefreshToken(ctx context.Context, rt *string) (*model.AuthPayload, error) {
	return r.guestService.RefreshToken(*rt)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
