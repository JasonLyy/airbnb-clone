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
export type MyTestQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyTestQueryQuery = (
  { __typename?: 'Query' }
  & { listings: (
    { __typename?: 'ListingConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ), edges: Array<Types.Maybe<(
      { __typename?: 'ListingEdge' }
      & Pick<Types.ListingEdge, 'cursor'>
      & { node: (
        { __typename?: 'Listing' }
        & Pick<Types.Listing, 'id' | 'name' | 'amenities'>
      ) }
    )>> }
  ) }
);


export const MyTestQueryDocument = `
    query myTestQuery {
  listings(page: {first: 10, after: "82XCAAAAAAA="}) {
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
export const useMyTestQueryQuery = <
      TData = MyTestQueryQuery,
      TError = unknown
    >(
      variables?: MyTestQueryQueryVariables, 
      options?: UseQueryOptions<MyTestQueryQuery, TError, TData>
    ) => 
    useQuery<MyTestQueryQuery, TError, TData>(
      ['myTestQuery', variables],
      fetcher<MyTestQueryQuery, MyTestQueryQueryVariables>(MyTestQueryDocument, variables),
      options
    );