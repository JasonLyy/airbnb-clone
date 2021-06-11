package guest

import (
	"fmt"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
)

type guestService struct {
	authService  auth.AuthInterface
	tokenService auth.TokenInterface
	guestRepo    GuestRepository
}

func NewGuestService(a auth.AuthInterface, t auth.TokenInterface, g GuestRepository) *guestService {
	return &guestService{
		authService:  a,
		tokenService: t,
		guestRepo:    g,
	}
}

func (g guestService) CreateGuest(input model.CredentialsInput) (*model.AuthPayload, error) {
	guest, err := g.guestRepo.CreateGuest(input)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	token, err := g.tokenService.CreateToken(guest.ID)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	err = g.authService.CreateAuth(guest.ID, token)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	return &model.AuthPayload{
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
	}, nil
}

func (g guestService) LoginGuest(input model.CredentialsInput) (*model.AuthPayload, error) {
	guest, err := g.guestRepo.Authenticate(input.Email, input.Password)
	if err != nil {
		return &model.AuthPayload{}, fmt.Errorf("unauthorized")
	}

	tk, err := g.tokenService.CreateToken(guest.ID)
	if err != nil {
		return &model.AuthPayload{}, fmt.Errorf("unauthorized")
	}

	err = g.authService.CreateAuth(guest.ID, tk)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	return &model.AuthPayload{
		AccessToken:  tk.AccessToken,
		RefreshToken: tk.RefreshToken,
	}, nil
}

func (g guestService) LogoutGuest(accessToken string) (*model.LogoutPayload, error) {
	auth, err := g.tokenService.GetAccessDetailsFromToken(accessToken)
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

func (g guestService) RefreshToken(refreshToken string) (*model.AuthPayload, error) {
	auth, err := g.authService.RefreshAuth(refreshToken)
	if err != nil {
		return &model.AuthPayload{}, err
	}

	return auth, nil
}
