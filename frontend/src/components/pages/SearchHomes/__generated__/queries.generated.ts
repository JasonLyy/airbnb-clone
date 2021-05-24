import * as Types from '../../../../types/types.generated';

import { useQuery, UseQueryOptions } from 'react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:8001/graphql", {
      method: "POST",
      body: JSON.stringify({ query, variables }),
    });
    
    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type PageInfoFieldsFragment = (
  { __typename?: 'PageInfo' }
  & Pick<Types.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
);

export type ListingInfoFieldsFragment = (
  { __typename?: 'Listing' }
  & Pick<Types.Listing, 'id' | 'name' | 'price' | 'pictureUrl' | 'accommodates' | 'bedrooms' | 'beds' | 'bathrooms' | 'amenities' | 'reviews' | 'rating'>
);

export type GetListingsQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  after?: Types.Maybe<Types.Scalars['String']>;
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
    query getListings($first: Int!, $after: String) {
  listings(page: {first: $first, after: $after}) {
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
      fetcher<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, variables),
      options
    );