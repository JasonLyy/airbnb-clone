package model

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Guest struct {
	Id        int64     `gorm:"primaryKey;column:guest_id;auto_increment" json:"guest_id"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

// required for gqlgen to generate.
func (Guest) IsNode() {}

func (*Guest) TableName() string {
	return "guests"
}

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
