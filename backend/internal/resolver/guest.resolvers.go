package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/JasonLyy/airbnb-clone/backend/internal/auth"
	"github.com/JasonLyy/airbnb-clone/backend/internal/generated"
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
)

func (r *mutationResolver) CreateGuest(ctx context.Context, input model.CredentialsInput) (*model.AuthPayload, error) {
	repo := repository.NewGuestRepository(r.db)
	tokenService := auth.NewTokenService()
	authService := auth.NewAuthService(r.rd)

	guest, err := repo.CreateGuest(input)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	token, err := tokenService.CreateToken(guest.ID)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	err = authService.CreateAuth(guest.ID, token)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	return &model.AuthPayload{
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
	}, nil
}

func (r *mutationResolver) LoginGuest(ctx context.Context, input model.CredentialsInput) (*model.AuthPayload, error) {
	tokenService := auth.NewTokenService()
	authService := auth.NewAuthService(r.rd)

	guestService := repository.NewGuestRepository(r.db)
	guest, err := guestService.Authenticate(input.Email, input.Password)
	if err != nil {
		return &model.AuthPayload{}, fmt.Errorf("unauthorized")
	}

	tk, err := tokenService.CreateToken(guest.ID)
	if err != nil {
		return &model.AuthPayload{}, fmt.Errorf("unauthorized")
	}

	err = authService.CreateAuth(guest.ID, tk)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	return &model.AuthPayload{
		AccessToken:  tk.AccessToken,
		RefreshToken: tk.RefreshToken,
	}, nil
}

func (r *mutationResolver) LogoutGuest(ctx context.Context, accessToken string) (*model.LogoutPayload, error) {
	tokenService := auth.NewTokenService()
	authService := auth.NewAuthService(r.rd)

	auth, err := tokenService.GetAccessDetailsFromToken(accessToken)
	if err != nil {
		return &model.LogoutPayload{}, err
	}

	if err := authService.InvalidateAuth(auth); err != nil {
		return &model.LogoutPayload{}, err
	}

	return &model.LogoutPayload{
		Success: true,
	}, nil
}

func (r *mutationResolver) RefreshToken(ctx context.Context, resfreshToken *string) (*model.AuthPayload, error) {
	authService := auth.NewAuthService(r.rd)

	auth, err := authService.RefreshAuth(*resfreshToken)
	if err != nil {
		return &model.AuthPayload{}, err

	}

	return auth, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
