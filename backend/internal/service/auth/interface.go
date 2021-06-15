package auth

import (
	"net/http"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/dgrijalva/jwt-go"
)

type AuthService interface {
	CreateAuth(int64, *TokenDetails) error
	FetchAuthUser(*AccessDetails) (int64, error)
	InvalidateAuth(auth *AccessDetails) error
	RefreshAuth(rt string) (*model.AuthPayload, error)
}

type TokenService interface {
	GetAccessDetailsFromToken(token *jwt.Token) (*AccessDetails, error)
	CreateToken(id int64) (*TokenDetails, error)
	ExtractToken(*http.Request) string
	ParseToken(t string) (*jwt.Token, error)
}
