package resolver

import (
	"encoding/base64"
	"encoding/binary"
	"fmt"

	"github.com/JasonLyy/airbnb-clone-server/internal/model"
	"gorm.io/gorm"
)

const DEFAULT_PAGINATION_LIIMT = 10

func encodeCursor(id int64) string {
	b := make([]byte, 8)
	binary.LittleEndian.PutUint64(b, uint64(id))

	return base64.StdEncoding.EncodeToString(b)
}

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

//todo: need to explore how to make this more generic given that in Golang there is no generic :\
func listingsToConnection(listings []*model.Listing, page model.PaginationInput) *model.ListingConnection {
	if len(listings) == 0 {
		return &model.ListingConnection{PageInfo: &model.PageInfo{}}
	}

	pageInfo := model.PageInfo{}
	if page.First != nil {
		if len(listings) >= *page.First+1 {
			pageInfo.HasNextPage = true
			listings = listings[:len(listings)-1]
		}
	}

	listingEdges := make([]*model.ListingEdge, len(listings))
	for i, listing := range listings {
		cursor := encodeCursor(listing.Id)

		listingEdges[i] = &model.ListingEdge{
			Cursor: cursor,
			Node:   listing,
		}
	}

	// todo: need to check if this logic is correct
	if page.After != nil {
		pageInfo.HasPreviousPage = true
	}

	pageInfo.StartCursor = listingEdges[0].Cursor
	pageInfo.EndCursor = listingEdges[len(listingEdges)-1].Cursor

	return &model.ListingConnection{PageInfo: &pageInfo, Edges: listingEdges}
}
