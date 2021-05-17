import { gql } from "graphql-request";
const GET_LISTINGS = gql`
  query myTestQuery {
    listings(page: { first: 10, after: "82XCAAAAAAA=" }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          name
          amenities
        }
      }
    }
  }
`;
