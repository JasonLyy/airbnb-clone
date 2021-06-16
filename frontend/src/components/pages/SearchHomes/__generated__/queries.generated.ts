import * as Types from '../../../../types/types.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { fetchData } from 'App/fetcher';
export type PageInfoFieldsFragment = (
  { __typename?: 'PageInfo' }
  & Pick<Types.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
);

export type ListingInfoFieldsFragment = (
  { __typename?: 'Listing' }
  & Pick<Types.Listing, 'id' | 'name' | 'price' | 'pictureUrl' | 'accommodates' | 'bedrooms' | 'beds' | 'bathrooms' | 'amenities' | 'reviews' | 'rating'>
);

export type GetListingsQueryVariables = Types.Exact<{
  page: Types.PaginationInput;
  input: Types.ListingsInput;
}>;


export type GetListingsQuery = (
  { __typename?: 'Query' }
  & { listings: (
    { __typename?: 'ListingConnection' }
    & Pick<Types.ListingConnection, 'totalResults'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFieldsFragment
    ), edges: Array<(
      { __typename?: 'ListingEdge' }
      & Pick<Types.ListingEdge, 'cursor'>
      & { node: (
        { __typename?: 'Listing' }
        & ListingInfoFieldsFragment
      ) }
    )> }
  ) }
);

export const PageInfoFieldsFragmentDoc = `
    fragment PageInfoFields on PageInfo {
  startCursor
  endCursor
  hasNextPage
  hasPreviousPage
}
    `;
export const ListingInfoFieldsFragmentDoc = `
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
export const GetListingsDocument = `
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
    ${PageInfoFieldsFragmentDoc}
${ListingInfoFieldsFragmentDoc}`;
export const useGetListingsQuery = <
      TData = GetListingsQuery,
      TError = unknown
    >(
      variables: GetListingsQueryVariables, 
      options?: UseQueryOptions<GetListingsQuery, TError, TData>
    ) => 
    useQuery<GetListingsQuery, TError, TData>(
      ['getListings', variables],
      fetchData<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, variables),
      options
    );