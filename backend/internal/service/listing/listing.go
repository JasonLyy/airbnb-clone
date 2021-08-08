package listing

import (
	"encoding/base64"
	"encoding/binary"
	"fmt"
	"math"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/review"
)

type listingService struct {
	listingRepo ListingRepository
	reviewRepo  review.ReviewRepository
}

func NewListingService(l ListingRepository, r review.ReviewRepository) *listingService {
	return &listingService{
		listingRepo: l,
		reviewRepo:  r,
	}
}

func (l listingService) Reviews(id int64) (int64, error) {
	return l.reviewRepo.ListingTotalReviews(id)
}

func (l listingService) Rating(id int64) (float64, error) {
	return l.reviewRepo.ListingRating(id)
}

func (l listingService) Listing(id int64) (*model.Listing, error) {
	return l.listingRepo.Listing(id)
}

func (l listingService) ListingConnection(page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error) {
	if page.First == nil {
		return &model.ListingConnection{}, fmt.Errorf("require first input")
	}

	var guests int
	if input.Adults != nil {
		guests += *input.Adults
	}
	if input.Children != nil {
		guests += *input.Children
	}
	if input.Infants != nil {
		guests += *input.Infants
	}

	nights := 1
	if input.CheckIn != nil && input.CheckOut != nil {
		nights = int(math.Ceil(input.CheckOut.Sub(*input.CheckIn).Hours() / 24))
	}

	listings, e := l.listingRepo.FilteredListings(page, nights, guests, input.Location)
	if e != nil {
		return &model.ListingConnection{}, e
	}

	return listingsToConnection(listings, page, int64(len(listings))), nil
}

func listingsToConnection(listings []*model.Listing, page model.PaginationInput, count int64) *model.ListingConnection {
	if len(listings) == 0 {
		return &model.ListingConnection{}
	}

	pageInfo := model.PageInfo{}
	if page.First != nil {
		if len(listings) >= *page.First+1 {
			pageInfo.HasNextPage = true
			listings = listings[:len(listings)-1]
		}
	}

	if page.After != nil {
		pageInfo.HasPreviousPage = true
	}

	listingEdges := make([]*model.ListingEdge, len(listings))
	for i, listing := range listings {
		cursor := encodeCursor(listing.ID)

		listingEdges[i] = &model.ListingEdge{
			Cursor: cursor,
			Node:   listing,
		}
	}

	pageInfo.StartCursor = listingEdges[0].Cursor
	pageInfo.EndCursor = listingEdges[len(listingEdges)-1].Cursor

	return &model.ListingConnection{PageInfo: &pageInfo, Edges: listingEdges, TotalResults: int(count)}
}

// this should not belong here. possibly a centralised helper location..?
func encodeCursor(id int64) string {
	b := make([]byte, 8)
	binary.LittleEndian.PutUint64(b, uint64(id))

	return base64.StdEncoding.EncodeToString(b)
}
