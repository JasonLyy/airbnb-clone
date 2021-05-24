import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { GetListingsQueryVariables } from "./__generated__/queries.generated";
import queryString from "query-string";

type SearchListingsQueryParams = {
  checkin: string;
  checkout: string;
  adults: string;
  children: string;
  infants: string;
  cursor: string;
  previous: string;
  next: string;
};

const SEARCH_QUERY_LIMIT = 10;

const isSearchListingsQueryParams = (search: {
  [key: string]: string | string[] | null;
}): search is SearchListingsQueryParams => {
  const isValidParam = (key: string, search: { [key: string]: unknown }) => {
    return key in search && typeof search[key] === "string";
  };

  return (
    isValidParam("checkin", search) ||
    isValidParam("checkout", search) ||
    isValidParam("adults", search) ||
    isValidParam("children", search) ||
    isValidParam("infants", search) ||
    isValidParam("previous", search) ||
    isValidParam("next", search)
  );
};

const getGetListingsQueryParams = (searchQueryParams: {
  [key: string]: string | string[] | null;
}): GetListingsQueryVariables => {
  if (isSearchListingsQueryParams(searchQueryParams)) {
    if ("previous" in searchQueryParams && "next" in searchQueryParams) {
      return {
        first: SEARCH_QUERY_LIMIT,
        after: searchQueryParams.next,
      };
    }
  }

  return {
    first: SEARCH_QUERY_LIMIT,
  };
};

export const useGetSearchHomesParam = (): [
  GetListingsQueryVariables,
  () => void,
  (hasPreviousPage: boolean, endCursor: string) => void
] => {
  const { search, pathname } = useLocation<SearchListingsQueryParams>();

  const searchParams = new URLSearchParams(search);
  const searchQueryParams = queryString.parse(search);

  const history = useHistory();

  const [
    searchListingsQueryParams,
    setSearchListingsQueryParams,
  ] = useState<GetListingsQueryVariables>(
    getGetListingsQueryParams(searchQueryParams)
  );

  const previousCursors = useRef<(string | null)[]>([]);
  const holderCursor = useRef<string>("");

  if (isSearchListingsQueryParams(searchQueryParams)) {
    previousCursors.current = searchQueryParams.previous
      .split(",")
      .map((val) => (val === "" ? null : val));
  }

  const onPreviousClicked = () => {
    const previousCursor = previousCursors.current.pop();

    searchParams.set("previous", previousCursors.current.join(","));
    if (!previousCursor) {
      searchParams.delete("previous");
      searchParams.delete("next");
    }
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });

    setSearchListingsQueryParams({
      first: SEARCH_QUERY_LIMIT,
      after: previousCursor,
    });

    window.scrollTo(0, 0);
  };

  const onNextClicked = (hasPreviousPage: boolean, endCursor: string) => {
    if (!hasPreviousPage) {
      previousCursors.current.push(null);
      holderCursor.current = endCursor;
    } else {
      previousCursors.current.push(holderCursor.current);
    }
    holderCursor.current = endCursor;

    previousCursors.current &&
      searchParams.set("previous", previousCursors.current.join(","));
    searchParams.set("next", endCursor);

    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });

    setSearchListingsQueryParams({
      first: SEARCH_QUERY_LIMIT,
      after: endCursor,
    });

    window.scrollTo(0, 0);
  };

  return [searchListingsQueryParams, onPreviousClicked, onNextClicked];
};
