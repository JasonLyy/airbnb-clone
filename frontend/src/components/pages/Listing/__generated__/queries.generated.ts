import * as Types from '../../../../types/types.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetchData } from 'App/fetcher';
export type ListingQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ListingQuery = (
  { __typename?: 'Query' }
  & { listing?: Types.Maybe<(
    { __typename?: 'Listing' }
    & Pick<Types.Listing, 'id' | 'name' | 'description' | 'neighbourhood' | 'neighbourhoodCleansed' | 'neighbourhoodOverview' | 'propertyType' | 'amenities' | 'reviews' | 'rating' | 'beds' | 'bedrooms' | 'bathrooms'>
  )> }
);


export const ListingDocument = `
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
export const useListingQuery = <
      TData = ListingQuery,
      TError = unknown
    >(
      variables: ListingQueryVariables, 
      options?: UseQueryOptions<ListingQuery, TError, TData>
    ) => 
    useQuery<ListingQuery, TError, TData>(
      ['listing', variables],
      fetchData<ListingQuery, ListingQueryVariables>(ListingDocument, variables),
      options
    );