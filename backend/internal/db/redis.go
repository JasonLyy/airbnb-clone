package db

import (
	"fmt"
	"os"

	"github.com/go-redis/redis/v7"
	"github.com/joho/godotenv"
)

type redisConfig struct {
	host string
	port string
}

func loadRedisVariables() (*redisConfig, error) {
	err := godotenv.Load(".env.dev")
	if err != nil {
		return nil, err
	}

	return &redisConfig{
		host: os.Getenv("REDIS_HOST"),
		port: os.Getenv("REDIS_PORT"),
	}, nil
}

func InitRedis() *redis.Client {
	vars, err := loadRedisVariables()
	if err != nil {
		panic("Failed to load Redis variables")
	}

	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", vars.host, vars.port),
		Password: "",
		DB:       0,
	})

	if _, err := client.Ping().Result(); err != nil {
		panic("Could not connect to Redis")
	}

	return client
}
