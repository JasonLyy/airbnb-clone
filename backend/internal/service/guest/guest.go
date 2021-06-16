package guest

import (
	"fmt"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
)

type guestService struct {
	authService  auth.AuthService
	tokenService auth.TokenService
	guestRepo    GuestRepository
}

func NewGuestService(a auth.AuthService, t auth.TokenService, g GuestRepository) *guestService {
	return &guestService{
		authService:  a,
		tokenService: t,
		guestRepo:    g,
	}
}

func (g guestService) CreateGuest(input model.CredentialsInput) (*auth.TokenDetails, error) {
	guest, err := g.guestRepo.CreateGuest(input)
	if err != nil {
		return &auth.TokenDetails{}, err
	}

	token, err := g.tokenService.CreateToken(guest.ID)
	if err != nil {
		return &auth.TokenDetails{}, err
	}

	err = g.authService.CreateAuth(guest.ID, token)
	if err != nil {
		return &auth.TokenDetails{}, err
	}

	return token, nil
}

func (g guestService) LoginGuest(input model.CredentialsInput) (*auth.TokenDetails, error) {
	guest, err := g.guestRepo.Authenticate(input.Email, input.Password)
	if err != nil {
		return &auth.TokenDetails{}, fmt.Errorf("unauthorized")
	}

	tk, err := g.tokenService.CreateToken(guest.ID)
	if err != nil {
		return &auth.TokenDetails{}, fmt.Errorf("unauthorized")
	}

	err = g.authService.CreateAuth(guest.ID, tk)
	if err != nil {
		return &auth.TokenDetails{}, err
	}

	return tk, nil
}

func (g guestService) FindGuest(id int64) (*model.Guest, error) {
	return g.guestRepo.FindGuestById(id)
}

func (g guestService) LogoutGuest(accessToken string) (*model.LogoutPayload, error) {
	token, err := g.tokenService.ParseToken(accessToken)
	if err != nil {
		return &model.LogoutPayload{}, err
	}

	auth, err := g.tokenService.GetAccessDetailsFromToken(token)
	if err != nil {
		return &model.LogoutPayload{}, err
	}

	if err := g.authService.InvalidateAuth(auth); err != nil {
		return &model.LogoutPayload{}, err
	}

	return &model.LogoutPayload{
		Success: true,
	}, nil
}

func (g guestService) RefreshToken(refreshToken string) (*auth.TokenDetails, error) {
	token, err := g.authService.RefreshAuth(refreshToken)
	if err != nil {
		return &auth.TokenDetails{}, err
	}

	return token, nil
}
