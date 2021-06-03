package db

import (
	"fmt"
	"os"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
	DB *gorm.DB
}

type dbConfig struct {
	host     string
	user     string
	password string
	port     string
	name     string
	timeZone string
}

func loadDbVariables() (*dbConfig, error) {
	err := godotenv.Load(".env.dev")
	if err != nil {
		return nil, err
	}

	return &dbConfig{
		host:     os.Getenv("DB_HOST"),
		user:     os.Getenv("DB_USER"),
		password: os.Getenv("DB_PASSWORD"),
		port:     os.Getenv("DB_PORT"),
		name:     os.Getenv("DB_NAME"),
		timeZone: os.Getenv("DB_TIMEZONE"),
	}, nil
}

func migrate(db *gorm.DB) error {
	err := db.Transaction(func(tx *gorm.DB) error {
		if err := tx.AutoMigrate(&model.Guest{}); err != nil {
			return err
		}
		if err := tx.AutoMigrate(&model.Review{}); err != nil {
			return err
		}
		if err := tx.AutoMigrate(&model.Host{}); err != nil {
			return err
		}
		if err := tx.AutoMigrate(&model.Listing{}); err != nil {
			return err
		}

		return nil
	})

	return err
}

func Init() *DB {
	vars, err := loadDbVariables()
	if err != nil {
		panic("Failure to get database environment variables.")
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s TimeZone=%s",
		vars.host,
		vars.user,
		vars.password,
		vars.name,
		vars.port,
		vars.timeZone)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	err = migrate(db)
	if err != nil {
		panic("Failed to migrate")
	}

	return &DB{DB: db}
}
