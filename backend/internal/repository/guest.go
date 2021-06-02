package repository

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"gorm.io/gorm"
)

type guestRepository struct {
	DB *gorm.DB
}

type GuestRepository interface {
	CreateGuest(input model.CreateGuestInput) []*model.Guest
}

func NewGuestRepository(db *gorm.DB) guestRepository {
	return guestRepository{
		DB: db,
	}
}

//todo: handle update duplicate index as imported a DB
func (g guestRepository) CreateGuest(input model.CreateGuestInput) (*model.Guest, error) {
	guest := model.Guest{
		Email:    input.Email,
		Password: input.Password,
	}

	err := g.DB.Create(&guest).Error
	if err != nil {
		return &model.Guest{}, err
	}

	return &guest, nil
}
