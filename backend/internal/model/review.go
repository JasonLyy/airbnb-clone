package model

type Review struct {
	Id         int64  `gorm:"primaryKey;column:review_id" json:"review_id"`
	ReviewDate string `json:"review_date"`
	Comment    string `json:"comment"`
	Rating     int64  `json:"rating"`
	GuestId    string `json:"guest_id"`
	ListingId  string `json:"listing_id"`
}

// required for gqlgen to generate.
func (Review) IsNode() {}

func (*Review) TableName() string {
	return "reviews"
}
