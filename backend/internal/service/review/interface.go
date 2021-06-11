package review

type ReviewRepository interface {
	ListingRating(id int64) (float64, error)
	ListingTotalReviews(id int64) (int64, error)
}
