import React from "react";
import styled from "styled-components";
import Results from "./Results";
import { useGetListingsQuery } from "./__generated__/queries.generated";
import { useSearchListingsParam } from "./useSearchParams";
import Pagination from "../../shared/Pagination";

const SearchHomeContainer = styled.div`
  background-color: white;
`;

const SearchHomesHeader = styled.div`
  background-color: ${(p) => p.theme.colors.primaryBackground};
  height: 80px;
`;

const SearchHomesBody = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const SearchHomesMap = styled.div`
  background-color: #e6e3df;
  flex: 1;
`;

const SearchHomesFooter = styled.div`
  background-color: black;
  height: 550px;
`;

const SearchHomes: React.FC = () => {
  const [
    searchQueryParams,
    onPreviousClicked,
    onNextClicked,
  ] = useSearchListingsParam();

  const { isLoading, data } = useGetListingsQuery(searchQueryParams);
  if (!data || isLoading) return <div>loading</div>;

  const listingsInput = searchQueryParams.input;

  const {
    listings: {
      edges,
      totalResults,
      pageInfo: { hasPreviousPage, hasNextPage, endCursor },
    },
  } = data;
  const listings = edges.map((e) => e.node);

  return (
    <SearchHomeContainer>
      <SearchHomesHeader>Search Header</SearchHomesHeader>
      <SearchHomesBody>
        <Results
          listings={listings}
          totalResults={totalResults}
          listingsInput={listingsInput}
        >
          <Pagination
            onPreviousClicked={() => onPreviousClicked()}
            onNextClicked={() => onNextClicked(hasPreviousPage, endCursor)}
            onPreviousDisabled={!hasPreviousPage}
            onNextDisabled={!hasNextPage}
          />
        </Results>
        <SearchHomesMap />
      </SearchHomesBody>
      <SearchHomesFooter>Footer</SearchHomesFooter>
    </SearchHomeContainer>
  );
};

export default SearchHomes;
