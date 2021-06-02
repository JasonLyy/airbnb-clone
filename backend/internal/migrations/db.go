package migrations

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
	"github.com/joho/godotenv"
)

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

func InitConnection() (*pgx.Conn, error) {
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

	return pgx.Connect(context.Background(), dsn)
}
