import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import parseDate from "date-fns/parse";
import subtractDateMinutes from "date-fns/subMinutes";
import { GetListingsQueryVariables } from "./__generated__/queries.generated";
import { ListingsInput } from "../../../types/types.generated";

type SearchListingsQueryParams = { [K in keyof ListingsInput]: string } & {
  previous?: string;
  next?: string;
};

const SEARCH_QUERY_LIMIT = 10;

const isSearchListingsQueryParams = (search: {
  [K: string]: string | string[] | null;
}): search is SearchListingsQueryParams => {
  const isValidParam = (key: string, search: { [key: string]: unknown }) => {
    return key in search && typeof search[key] === "string";
  };

  return (
    isValidParam("location", search) ||
    isValidParam("checkIn", search) ||
    isValidParam("checkOut", search) ||
    isValidParam("adults", search) ||
    isValidParam("children", search) ||
    isValidParam("infants", search) ||
    isValidParam("previous", search) ||
    isValidParam("next", search)
  );
};

const useSearchListingsQueryParams = (): GetListingsQueryVariables => {
  const { search } = useLocation<SearchListingsQueryParams>();

  const searchQueryParams = queryString.parse(search);
  const searchParams = useGetSearchParams();

  if (searchParams !== null) {
    if (isSearchListingsQueryParams(searchQueryParams)) {
      const isNotSecondPage =
        "previous" in searchQueryParams &&
        "next" in searchQueryParams &&
        "next";
      if (isNotSecondPage) {
        return {
          page: { first: SEARCH_QUERY_LIMIT, after: searchQueryParams.next },
          input: searchParams,
        };
      }

      return {
        page: { first: SEARCH_QUERY_LIMIT },
        input: searchParams,
      };
    }
  }

  return {
    page: { first: SEARCH_QUERY_LIMIT },
    input: { location: "Explore Nearby Destinations" },
  };
};

export const useGetSearchParams = (): ListingsInput | null => {
  const { search, pathname } = useLocation<SearchListingsQueryParams>();

  const searchQueryParams = queryString.parse(search);
  const destination = pathname
    .split("/")[2]
    .replaceAll("_", ", ")
    .replaceAll("-", " ");

  const params = {
    location: destination,
    ...searchQueryParams,
  };

  if (isSearchListingsQueryParams(params)) {
    const { location, checkIn, checkOut, adults, infants, children } = params;

    const timezoneMinuteDifference = new Date().getTimezoneOffset();
    const checkInDate = checkIn
      ? subtractDateMinutes(
          parseDate(checkIn, "dd/MM/yyyy", new Date()),
          timezoneMinuteDifference
        ).toISOString()
      : null;
    const checkOutDate = checkOut
      ? subtractDateMinutes(
          parseDate(checkOut, "dd/MM/yyyy", new Date()),
          timezoneMinuteDifference
        ).toISOString()
      : null;

    return {
      location,
      ...(checkInDate ? { checkIn: checkInDate } : {}),
      ...(checkOutDate ? { checkOut: checkOutDate } : {}),
      ...(adults ? { adults: parseInt(adults) } : {}),
      ...(children ? { children: parseInt(children) } : {}),
      ...(infants ? { infants: parseInt(infants) } : {}),
    };
  }

  return null;
};

export const useSearchListingsParam = (): [
  GetListingsQueryVariables,
  () => void,
  (hasPreviousPage: boolean, endCursor: string) => void
] => {
  const { search, pathname } = useLocation<SearchListingsQueryParams>();
  const history = useHistory();
  const searchQueryParams = queryString.parse(search);

  const [
    searchListingsQueryParams,
    setSearchListingsQueryParams,
  ] = useState<GetListingsQueryVariables>(useSearchListingsQueryParams());

  const previousCursors = useRef<(string | null)[]>([]);
  const holderCursor = useRef<string>("");

  if (isSearchListingsQueryParams(searchQueryParams)) {
    previousCursors.current = (searchQueryParams.previous ?? "")
      .split(",")
      .map((val) => (val === "" ? null : val));
  }

  const searchParams = new URLSearchParams(search);

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

    setSearchListingsQueryParams((state) => ({
      ...state,
      page: {
        first: SEARCH_QUERY_LIMIT,
        after: previousCursor,
      },
    }));

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

    setSearchListingsQueryParams((state) => ({
      ...state,
      page: {
        first: SEARCH_QUERY_LIMIT,
        after: endCursor,
      },
    }));

    window.scrollTo(0, 0);
  };

  return [searchListingsQueryParams, onPreviousClicked, onNextClicked];
};
