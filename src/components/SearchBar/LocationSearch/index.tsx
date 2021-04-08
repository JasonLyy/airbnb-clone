import React from "react";
import SearchInput from "../common/SearchInput";
import SearchItem from "../common/SearchItem";
import LocationSearchResult from "./LocationSearchResult";

interface LocationSearchProps {
  selected: boolean | null;
  onClick: () => void;
  locationText: string | undefined;
  setLocationText: (t?: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onClick,
  selected,
  locationText,
  setLocationText,
}) => {
  return (
    <>
      <SearchItem selected={selected} onClick={onClick} flexGrow={1.5}>
        <SearchInput
          onTextChange={(t) => setLocationText(t)}
          title="Location"
          placeholder="Where are you going?"
        />
      </SearchItem>

      {selected && <LocationSearchResult inputText={locationText} />}
    </>
  );
};

export default LocationSearch;
