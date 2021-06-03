package model

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Guest struct {
	ID        int64 `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	FirstName string
	Email     string `gorm:"unique"`
	Password  string
	Reviews   []Review
}

// required for gqlgen to generate.
func (Guest) IsNode() {}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(hashedPw string, pw string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPw), []byte(pw))
}

func (u *Guest) BeforeSave(tx *gorm.DB) (err error) {
	password, err := Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(password)

	return nil
}
