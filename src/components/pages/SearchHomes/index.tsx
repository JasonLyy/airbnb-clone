import React from "react";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

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

const useListings = () => {
  //   useQuery("listings", async () => {
  //     c;
  //   });
};

const SearchHomes: React.FC = () => {
  return <div>Search Homes</div>;
};

export default SearchHomes;
