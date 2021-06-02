package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
)

func (r *mutationResolver) CreateGuest(ctx context.Context, input model.CreateGuestInput) (*model.AuthPayload, error) {
	repo := repository.NewGuestRepository(r.db)

	guest, err := repo.CreateGuest(input)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	pw, err := model.Hash(guest.Password)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	return &model.AuthPayload{
		User:  guest,
		Token: string(pw),
	}, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
