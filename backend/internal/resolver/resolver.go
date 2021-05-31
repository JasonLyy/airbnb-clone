package resolver

import "gorm.io/gorm"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

func New(db *gorm.DB) *Resolver {
	return &Resolver{
		db: db,
	}
}

type Resolver struct {
	db *gorm.DB
}
