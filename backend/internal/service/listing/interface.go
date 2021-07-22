package listing

import "github.com/JasonLyy/airbnb-clone/backend/internal/model"

type ListingRepository interface {
	Listing(id int64) (*model.Listing, error)
	FilteredListings(page model.PaginationInput, nights int, guests int, location string) ([]*model.Listing, error)
}

type ListingService interface {
	Listing(id int64) (*model.Listing, error)
	ListingConnection(page model.PaginationInput, input model.ListingsInput) (*model.ListingConnection, error)
	Reviews(id int64) (int64, error)
	Rating(id int64) (float64, error)
}
