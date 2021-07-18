import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

type ListingParam = ListingQueryParam & {
  listingId: string;
};

type ListingQueryParam = {
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  infants?: string;
};

const isListingQueryParams = (search: {
  [K: string]: string | string[] | null;
}): search is ListingQueryParam => {
  const isValidParam = (key: string, search: { [key: string]: unknown }) => {
    return key in search && typeof search[key] === "string";
  };

  return (
    isValidParam("checkIn", search) ||
    isValidParam("checkOut", search) ||
    isValidParam("adults", search) ||
    isValidParam("children", search) ||
    isValidParam("infants", search)
  );
};

export const useGetListingParam = (): ListingParam => {
  const { location } = useHistory();
  const { search } = useLocation();

  const listingId = location.pathname.split("/")[2];
  const queryParams = queryString.parse(search);

  if (isListingQueryParams(queryParams)) {
    return {
      listingId,
      ...queryParams,
    };
  }

  return { listingId };
};
