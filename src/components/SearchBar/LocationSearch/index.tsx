import React, { useState } from "react";
import SearchInput from "../common/SearchInput";
import SearchItem from "../common/SearchItem";
import LocationSearchResult from "./LocationSearchResult";

interface LocationSearchProps {
  selected: boolean | null;
  onClick: () => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onClick,
  selected,
}) => {
  const [inputText, setInputText] = useState<string | undefined>();

  return (
    <>
      <SearchItem selected={selected} onClick={onClick} flexGrow={1.5}>
        <SearchInput
          onTextChange={(text) => setInputText(text)}
          title="Location"
          placeholder="Where are you going?"
        />
      </SearchItem>

      {selected && <LocationSearchResult inputText={inputText} />}
    </>
  );
};

export default LocationSearch;
