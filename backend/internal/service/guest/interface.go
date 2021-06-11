package guest

import "github.com/JasonLyy/airbnb-clone/backend/internal/model"

type GuestRepository interface {
	CreateGuest(input model.CredentialsInput) (*model.Guest, error)
	Authenticate(email string, password string) (*model.Guest, error)
	FindGuestById(id int64) (*model.Guest, error)
}

type GuestService interface {
	CreateGuest(input model.CredentialsInput) (*model.AuthPayload, error)
	LoginGuest(input model.CredentialsInput) (*model.AuthPayload, error)
	LogoutGuest(accessToken string) (*model.LogoutPayload, error)
	RefreshToken(refreshToken string) (*model.AuthPayload, error)
}
