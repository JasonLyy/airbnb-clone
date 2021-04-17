package api

import (
	"fmt"
	"net/http"

	"github.com/JasonLyy/airbnb-clone-server/internal/model"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func GetListings(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) (err error) {
		listings := model.Listing{}

		body, err := listings.GetAllListings(db)

		return c.String(http.StatusOK, fmt.Sprintln(*body))
	}
}
