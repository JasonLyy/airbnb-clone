package resolver

import "github.com/JasonLyy/airbnb-clone/backend/internal/model"

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

	// todo: need to check if this logic is correct
	if page.After != nil {
		pageInfo.HasPreviousPage = true
	}

	pageInfo.StartCursor = listingEdges[0].Cursor
	pageInfo.EndCursor = listingEdges[len(listingEdges)-1].Cursor

	return &model.ListingConnection{PageInfo: &pageInfo, Edges: listingEdges, TotalResults: int(count)}
}
