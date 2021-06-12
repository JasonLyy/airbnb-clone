package auth

import (
	"net/http"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
)

type AuthService interface {
	CreateAuth(int64, *TokenDetails) error
	FetchAuthUser(*AccessDetails) (int64, error)
	InvalidateAuth(auth *AccessDetails) error
	RefreshAuth(rt string) (*model.AuthPayload, error)
}

type TokenService interface {
	CreateToken(id int64) (*TokenDetails, error)
	GetAccessDetailsFromToken(string) (*AccessDetails, error)
	ExtractToken(*http.Request) string
}
