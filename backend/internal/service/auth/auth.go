package auth

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/go-redis/redis/v7"
)

type authService struct {
	client       *redis.Client //todo: Do we need a repository for this? probably
	tokenService TokenService
}

func NewAuthService(c *redis.Client, ts TokenService) *authService {
	return &authService{client: c, tokenService: ts}
}

type AccessDetails struct {
	TokenUuid string
	UserId    int64
}

func (a *authService) CreateAuth(id int64, td *TokenDetails) error {
	at := time.Unix(td.AtExpires, 0) //converting Unix to UTC(to Time object)
	rt := time.Unix(td.RtExpires, 0)
	now := time.Now()

	atCreated, err := a.client.Set(td.TokenUuid, fmt.Sprintf("%d", id), at.Sub(now)).Result()
	if err != nil {
		return err
	}
	rtCreated, err := a.client.Set(td.RefreshUuid, fmt.Sprintf("%d", id), rt.Sub(now)).Result()
	if err != nil {
		return err
	}
	if atCreated == "0" || rtCreated == "0" {
		return errors.New("no record inserted")
	}
	return nil
}

func (a *authService) FetchAuthUser(auth *AccessDetails) (int64, error) {
	userid, err := a.client.Get(auth.TokenUuid).Result()
	if err != nil {
		return 0, err
	}

	userID, _ := strconv.ParseInt(userid, 10, 64)
	return userID, nil
}

func (a *authService) RefreshAuth(rt string) (*TokenDetails, error) {
	token, err := a.tokenService.ParseToken(rt)
	if err != nil {
		return nil, err
	}

	if verified := verifyToken(token); verified != nil {
		return nil, fmt.Errorf("Unauthorized")
	}

	claims, ok := token.Claims.(*TokenClaims)
	if !ok && !token.Valid {
		return nil, fmt.Errorf("Unauthorized")
	}

	if _, invalidToken := a.client.Get(claims.RefreshUuid).Result(); invalidToken != nil {
		return nil, fmt.Errorf("Unauthorized")
	}

	if delErr := a.DeleteRefresh(claims.RefreshUuid); delErr != nil {
		return nil, delErr
	}

	newToken, err := NewTokenService().CreateToken(claims.UserId)
	if err != nil {
		return nil, err
	}

	if createErr := a.CreateAuth(claims.UserId, newToken); createErr != nil {
		return nil, createErr
	}

	return newToken, nil
}

func (a *authService) InvalidateAuth(auth *AccessDetails) error {
	refreshUuid := fmt.Sprintf("%s++%d", auth.TokenUuid, auth.UserId)

	deletedAt, err := a.client.Del(auth.TokenUuid).Result()
	if err != nil {
		return err
	}

	deletedRt, err := a.client.Del(refreshUuid).Result()
	if err != nil {
		return err
	}
	//When the record is deleted, the return value is 1
	if deletedAt != 1 || deletedRt != 1 {
		return errors.New("something went wrong")
	}

	return nil
}

func (a *authService) DeleteRefresh(uuid string) error {
	deleted, err := a.client.Del(uuid).Result()
	if err != nil || deleted == 0 {
		return err
	}
	return nil
}
