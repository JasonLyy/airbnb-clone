package guest

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/auth"
)

type GuestRepository interface {
	CreateGuest(input model.CredentialsInput) (*model.Guest, error)
	Authenticate(email string, password string) (*model.Guest, error)
	FindGuestById(id int64) (*model.Guest, error)
}

type GuestService interface {
	CreateGuest(input model.CredentialsInput) (*auth.TokenDetails, error)
	LoginGuest(input model.CredentialsInput) (*auth.TokenDetails, error)
	FindGuest(id int64) (*model.Guest, error)
	LogoutGuest(accessToken string) (*model.LogoutPayload, error)
	RefreshToken(refreshToken string) (*model.AuthPayload, error)
}
