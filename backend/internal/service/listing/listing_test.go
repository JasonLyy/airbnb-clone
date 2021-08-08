package listing_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/JasonLyy/airbnb-clone/backend/internal/model"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/listing"
	"github.com/JasonLyy/airbnb-clone/backend/internal/service/review"
	"github.com/stretchr/testify/assert"
)

type fakeListingRepository struct {
	listing.ListingRepository
	listingData  *model.Listing
	listingsData []*model.Listing
	err          error
}

func (f *fakeListingRepository) Listing(id int64) (*model.Listing, error) {
	return f.listingData, f.err
}

func (f *fakeListingRepository) FilteredListings(page model.PaginationInput, nights int, guests int, location string) ([]*model.Listing, error) {
	return f.listingsData, f.err
}

type fakeReviewRepository struct {
	review.ReviewRepository
	totalReviews int64
	ratings      float64
	err          error
}

func (f *fakeReviewRepository) ListingTotalReviews(id int64) (int64, error) {
	return f.totalReviews, f.err
}

func (f *fakeReviewRepository) ListingRating(id int64) (float64, error) {
	return f.ratings, f.err
}

func TestReviews(t *testing.T) {
	t.Run("Reviews", func(t *testing.T) {
		reviewData := int64(1)

		fakeListingRepo := &fakeListingRepository{}
		fakeReviewRepo := &fakeReviewRepository{
			totalReviews: reviewData,
			err:          nil,
		}
		listingService := listing.NewListingService(fakeListingRepo, fakeReviewRepo)

		review, err := listingService.Reviews(0)
		if review != 1 {
			t.Errorf("expected %v, got %v", reviewData, review)
		}
		if err != nil {
			t.Errorf("expected nil, got %v", err)
		}
	})
}

func TestRating(t *testing.T) {
	t.Run("Rating", func(t *testing.T) {
		ratingData := float64(1.00)

		fakeListingRepo := &fakeListingRepository{}
		fakeReviewRepo := &fakeReviewRepository{
			ratings: ratingData,
			err:     nil,
		}
		listingService := listing.NewListingService(fakeListingRepo, fakeReviewRepo)

		rating, err := listingService.Rating(1)
		if rating != 1 {
			t.Errorf("expected %v, got %v", ratingData, rating)
		}
		if err != nil {
			t.Errorf("expected nil, got %v", err)
		}
	})
}

func TestListing(t *testing.T) {
	t.Run("Listing", func(t *testing.T) {
		listingData := &model.Listing{}

		fakeListingRepo := &fakeListingRepository{
			listingData: listingData,
			err:         nil,
		}
		fakeReviewRepo := &fakeReviewRepository{}
		listingService := listing.NewListingService(fakeListingRepo, fakeReviewRepo)

		listing, err := listingService.Listing(1)
		if listing != (listingData) {
			t.Errorf("expected %v, got %v", listingData, listing)
		}
		if err != nil {
			t.Errorf("expected nil, got %v", err)
		}
	})
}

func TestListingConnection(t *testing.T) {
	for _, test := range []struct {
		testName                  string
		page                      model.PaginationInput
		listingInput              model.ListingsInput
		filteredListings          []*model.Listing
		listingRepoErr            error
		expectedListingConnection *model.ListingConnection
		expectedErr               error
	}{
		{
			testName: "Listing connection returned with 0 filtered listings",
			page: model.PaginationInput{
				First: getIntPointer(1),
				After: getStringPointer("cursor"),
			},
			listingInput: model.ListingsInput{
				Location: "location",
				CheckIn:  &time.Time{},
				CheckOut: &time.Time{},
				Adults:   getIntPointer(1),
				Children: getIntPointer(1),
				Infants:  getIntPointer(1),
			},
			filteredListings:          make([]*model.Listing, 0),
			listingRepoErr:            nil,
			expectedListingConnection: &model.ListingConnection{},
			expectedErr:               nil,
		},
		{
			testName: "Listing repository returns error",
			page: model.PaginationInput{
				First: getIntPointer(1),
				After: getStringPointer("cursor"),
			},
			listingInput: model.ListingsInput{
				Location: "location",
				CheckIn:  &time.Time{},
				CheckOut: &time.Time{},
				Adults:   getIntPointer(1),
				Children: getIntPointer(1),
				Infants:  getIntPointer(1),
			},
			filteredListings:          make([]*model.Listing, 0),
			listingRepoErr:            fmt.Errorf("some error"),
			expectedListingConnection: &model.ListingConnection{},
			expectedErr:               fmt.Errorf("some error"),
		},
		{
			testName: "Listing repository returns error",
			page:     model.PaginationInput{},
			listingInput: model.ListingsInput{
				Location: "location",
				CheckIn:  &time.Time{},
				CheckOut: &time.Time{},
				Adults:   getIntPointer(1),
				Children: getIntPointer(1),
				Infants:  getIntPointer(1),
			},
			filteredListings:          make([]*model.Listing, 0),
			listingRepoErr:            nil,
			expectedListingConnection: &model.ListingConnection{},
			expectedErr:               fmt.Errorf("require first input"),
		},
		{
			testName: "Listings which requires pagination returns correctly",
			page: model.PaginationInput{
				First: getIntPointer(1),
			},
			listingInput: model.ListingsInput{
				Location: "location",
				CheckIn:  &time.Time{},
				CheckOut: &time.Time{},
				Adults:   getIntPointer(1),
				Children: getIntPointer(1),
				Infants:  getIntPointer(1),
			},
			filteredListings: []*model.Listing{{ID: 1}, {ID: 2}},
			listingRepoErr:   nil,
			expectedListingConnection: &model.ListingConnection{
				PageInfo: &model.PageInfo{
					StartCursor:     "AQAAAAAAAAA=",
					EndCursor:       "AQAAAAAAAAA=",
					HasPreviousPage: false,
					HasNextPage:     true,
				},
				Edges: []*model.ListingEdge{
					{
						Cursor: "AQAAAAAAAAA=",
						Node:   &model.Listing{ID: 1},
					},
				},
				TotalResults: 2,
			},
			expectedErr: nil,
		},
		{
			testName: "Listings which does not require pagination returns correctly",
			page: model.PaginationInput{
				First: getIntPointer(2),
			},
			listingInput: model.ListingsInput{
				Location: "location",
				CheckIn:  &time.Time{},
				CheckOut: &time.Time{},
				Adults:   getIntPointer(1),
				Children: getIntPointer(1),
				Infants:  getIntPointer(1),
			},
			filteredListings: []*model.Listing{{ID: 1}, {ID: 2}},
			listingRepoErr:   nil,
			expectedListingConnection: &model.ListingConnection{
				PageInfo: &model.PageInfo{
					StartCursor:     "AQAAAAAAAAA=",
					EndCursor:       "AgAAAAAAAAA=",
					HasPreviousPage: false,
					HasNextPage:     false,
				},
				Edges: []*model.ListingEdge{
					{
						Cursor: "AQAAAAAAAAA=",
						Node:   &model.Listing{ID: 1},
					},
					{
						Cursor: "AgAAAAAAAAA=",
						Node:   &model.Listing{ID: 2},
					},
				},
				TotalResults: 2,
			},
			expectedErr: nil,
		},
		{
			testName: "Listings which has after cursors returns correctly",
			page: model.PaginationInput{
				First: getIntPointer(1),
				After: getStringPointer("AQAAAAAAAAA="),
			},
			listingInput: model.ListingsInput{
				Location: "location",
				CheckIn:  &time.Time{},
				CheckOut: &time.Time{},
				Adults:   getIntPointer(1),
				Children: getIntPointer(1),
				Infants:  getIntPointer(1),
			},
			filteredListings: []*model.Listing{{ID: 2}},
			listingRepoErr:   nil,
			expectedListingConnection: &model.ListingConnection{
				PageInfo: &model.PageInfo{
					StartCursor:     "AgAAAAAAAAA=",
					EndCursor:       "AgAAAAAAAAA=",
					HasPreviousPage: true,
					HasNextPage:     false,
				},
				Edges: []*model.ListingEdge{
					{
						Cursor: "AgAAAAAAAAA=",
						Node:   &model.Listing{ID: 2},
					},
				},
				TotalResults: 1,
			},
			expectedErr: nil,
		},
	} {
		t.Run(test.testName, func(t *testing.T) {
			fakeListingRepo := &fakeListingRepository{
				listingsData: test.filteredListings,
				err:          test.listingRepoErr,
			}
			fakeReviewRepo := &fakeReviewRepository{}
			listingService := listing.NewListingService(fakeListingRepo, fakeReviewRepo)

			listingConnection, err := listingService.ListingConnection(test.page, test.listingInput)

			assert.Equal(t, test.expectedListingConnection, listingConnection)
			assert.Equal(t, test.expectedErr, err)
		})
	}
}

func getIntPointer(x int) *int          { return &x }
func getStringPointer(x string) *string { return &x }
