package listing

import (
	"encoding/base64"
	"encoding/binary"
	"math"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/repository"
)

type ListingInterface interface {
	ListingConnection(page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error)
	Reviews(id int64) (int64, error)
	Rating(id int64) (float64, error)
}

type listingService struct {
	listingRepo repository.ListingRepository
	reviewRepo  repository.ReviewRepository
}

func NewListingService(l repository.ListingRepository, r repository.ReviewRepository) *listingService {
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

func (l listingService) ListingConnection(page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error) {
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

	nights := int(math.Ceil(input.CheckOut.Sub(*input.CheckIn).Hours() / 24))

	listings, e := l.listingRepo.FilteredListings(page, nights, guests, input.Location)
	if e != nil {
		return &model.ListingConnection{}, e
	}

	return listingsToConnection(listings, page, int64(len(listings))), nil
}

func listingsToConnection(listings []*model.Listing, page model.PaginationInput, count int64) *model.ListingConnection {
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
		cursor := encodeCursor(listing.ID)

		listingEdges[i] = &model.ListingEdge{
			Cursor: cursor,
			Node:   listing,
		}
	}

	if page.After != nil {
		pageInfo.HasPreviousPage = true
	}

	pageInfo.StartCursor = listingEdges[0].Cursor
	pageInfo.EndCursor = listingEdges[len(listingEdges)-1].Cursor

	return &model.ListingConnection{PageInfo: &pageInfo, Edges: listingEdges, TotalResults: int(count)}
}

func encodeCursor(id int64) string {
	b := make([]byte, 8)
	binary.LittleEndian.PutUint64(b, uint64(id))

	return base64.StdEncoding.EncodeToString(b)
}
