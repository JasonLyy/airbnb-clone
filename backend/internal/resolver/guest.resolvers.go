package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/middleware"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

func (r *mutationResolver) CreateGuest(ctx context.Context, input model.CredentialsInput) (*model.AuthPayload, error) {
	t, err := r.guestService.CreateGuest(input)

	if err != nil {
		return &model.AuthPayload{}, err
	}

	SetAuthCookie(r.echoCtx, t)

	return &model.AuthPayload{
		AccessToken:  t.AccessToken,
		RefreshToken: t.RefreshToken,
	}, nil
}

func (r *mutationResolver) LoginGuest(ctx context.Context, input model.CredentialsInput) (*model.AuthPayload, error) {
	t, err := r.guestService.LoginGuest(input)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	SetAuthCookie(r.echoCtx, t)

	return &model.AuthPayload{
		AccessToken:  t.AccessToken,
		RefreshToken: t.RefreshToken,
	}, nil
}

func (r *mutationResolver) LogoutGuest(ctx context.Context) (*model.LogoutPayload, error) {
	at := middleware.ContextAccessToken(ctx)
	if at == nil {
		return &model.LogoutPayload{}, &UnauthorizedError{}
	}

	l, err := r.guestService.LogoutGuest(*at)
	if err != nil {
		return &model.LogoutPayload{}, nil
	}

	ClearAuthCookie(r.echoCtx)

	return l, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
