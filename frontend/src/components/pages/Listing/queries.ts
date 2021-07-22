import { gql } from "graphql-request";

gql`
  query listing($id: ID!) {
    listing(id: $id) {
      id
      name
      description
      neighbourhood
      neighbourhoodCleansed
      neighbourhoodOverview
      propertyType
      amenities
      reviews
      rating
      beds
      bedrooms
      bathrooms
      amenities
    }
  }
`;
