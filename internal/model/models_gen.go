// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Connection interface {
	IsConnection()
}

type Edge interface {
	IsEdge()
}

type Node interface {
	IsNode()
}

type ListingConnection struct {
	PageInfo *PageInfo      `json:"pageInfo"`
	Edges    []*ListingEdge `json:"edges"`
}

func (ListingConnection) IsConnection() {}

type ListingEdge struct {
	Cursor string   `json:"cursor"`
	Node   *Listing `json:"node"`
}

func (ListingEdge) IsEdge() {}

type PageInfo struct {
	StartCursor     string `json:"startCursor"`
	EndCursor       string `json:"endCursor"`
	HasPreviousPage bool   `json:"hasPreviousPage"`
	HasNextPage     bool   `json:"hasNextPage"`
}

type PaginationInput struct {
	First *int    `json:"first"`
	After *string `json:"after"`
}
