package auth

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"
)

type tokenService struct{}

type TokenClaims struct {
	UserId      int64  `json:"user_id"`
	AccessUuid  string `json:"access_uuid"`
	RefreshUuid string `json:"refresh_uuid"`
	jwt.StandardClaims
}

type TokenDetails struct {
	AccessToken  string
	RefreshToken string
	TokenUuid    string
	RefreshUuid  string
	AtExpires    int64
	RtExpires    int64
}

func NewTokenService() *tokenService {
	return &tokenService{}
}

type TokenInterface interface {
	CreateToken(id int64) (*TokenDetails, error)
	GetAccessDetailsFromToken(string) (*AccessDetails, error)
	ExtractToken(*http.Request) string
}

var _ TokenInterface = &tokenService{}

func (t *tokenService) CreateToken(id int64) (*TokenDetails, error) {
	td := &TokenDetails{}
	td.AtExpires = time.Now().Add(time.Minute * 30).Unix() //expires after 30 min
	td.TokenUuid = uuid.NewV4().String()
	td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
	td.RefreshUuid = td.TokenUuid + "++" + fmt.Sprintf("%d", id)

	var err error

	//Creating Access Token
	atClaims := jwt.MapClaims{}
	atClaims["access_uuid"] = td.TokenUuid
	atClaims["user_id"] = id
	atClaims["exp"] = td.AtExpires
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	td.AccessToken, err = at.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return nil, err
	}

	//Creating Refresh Token
	td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
	td.RefreshUuid = td.TokenUuid + "++" + fmt.Sprintf("%d", id)

	rtClaims := jwt.MapClaims{}
	rtClaims["refresh_uuid"] = td.RefreshUuid
	rtClaims["user_id"] = id
	rtClaims["exp"] = td.RtExpires
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)

	td.RefreshToken, err = rt.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return nil, err
	}

	return td, nil
}

func (t *tokenService) GetAccessDetailsFromToken(ts string) (*AccessDetails, error) {
	token, err := parseToken(ts)
	if err != nil {
		return nil, err
	}

	if verifiedErr := verifyToken(token); verifiedErr != nil {
		return nil, verifiedErr
	}

	return &AccessDetails{
		TokenUuid: token.Claims.(*TokenClaims).AccessUuid,
		UserId:    token.Claims.(*TokenClaims).UserId,
	}, nil
}

func (t *tokenService) ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func parseToken(t string) (*jwt.Token, error) {
	token, err := jwt.ParseWithClaims(t, &TokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}

func verifyToken(token *jwt.Token) error {
	if _, ok := token.Claims.(*TokenClaims); !ok && !token.Valid {
		return token.Claims.Valid()
	}

	return nil
}
