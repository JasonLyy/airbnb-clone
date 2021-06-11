package repository

import (
	"encoding/base64"
	"encoding/binary"
	"fmt"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"gorm.io/gorm"
)

const DEFAULT_PAGINATION_LIIMT = 10

// this should not belong here. possibly a centralised helper location..?
func decodeCursor(cursor string) (id uint64, err error) {
	bytes, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		return 0, err
	}

	return binary.LittleEndian.Uint64(bytes), err
}

func paginatedDb(db *gorm.DB, col string, page model.PaginationInput) (*gorm.DB, error) {
	var limit int

	if page.First == nil {
		limit = DEFAULT_PAGINATION_LIIMT
	} else {
		limit = *page.First + 1
	}

	if page.After != nil {
		decodedCursor, err := decodeCursor(*page.After)
		if err != nil {
			return db, err
		}

		db = db.Where(fmt.Sprintf("%s > ?", col), decodedCursor).Limit(limit)
	}

	return db.Limit(limit), nil
}
