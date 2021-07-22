import { gql } from "graphql-request";

const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
`;

const LISTING_FIELDS = gql`
  fragment ListingInfoFields on Listing {
    id
    name
    price
    pictureUrl
    accommodates
    bedrooms
    beds
    bathrooms
    amenities
    reviews
    rating
  }
`;

gql`
  ${PAGE_INFO_FIELDS}
  ${LISTING_FIELDS}

  query getListings($page: PaginationInput!, $input: ListingsInput!) {
    listings(page: $page, input: $input) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        cursor
        node {
          ...ListingInfoFields
        }
      }
      totalResults
    }
  }
`;
