package repository

import (
	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"gorm.io/gorm"
)

type guestRepository struct {
	DB *gorm.DB
}

type GuestRepository interface {
	CreateGuest(input model.CredentialsInput) (*model.Guest, error)
	Authenticate(email string, password string) (*model.Guest, error)
	FindGuestById(id int64) (*model.Guest, error)
}

var _ GuestRepository = &guestRepository{}

func NewGuestRepository(db *gorm.DB) guestRepository {
	return guestRepository{
		DB: db,
	}
}

//todo: handle update duplicate index as imported a DB
func (g guestRepository) CreateGuest(input model.CredentialsInput) (*model.Guest, error) {
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

func (g guestRepository) FindGuestById(id int64) (*model.Guest, error) {
	guest := &model.Guest{}

	err := g.DB.Find(&guest, id).Error
	if err != nil {
		return &model.Guest{}, err
	}

	return guest, nil
}

func (g guestRepository) Authenticate(email string, password string) (*model.Guest, error) {
	guest := &model.Guest{}

	err := g.DB.Where("email = ?", email).Find(&guest).Error
	if err != nil {
		return &model.Guest{}, err
	}

	if err := model.VerifyPassword(guest.Password, password); err != nil {
		return &model.Guest{}, err
	}

	return guest, nil
}
