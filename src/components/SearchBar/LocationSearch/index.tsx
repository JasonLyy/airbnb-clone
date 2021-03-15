import React, { useState } from "react";
import styled from "styled-components";
import LocationInput from "./LocationInput";
import LocationSearchResult from "./LocationSearchResult";
import { SearchInput } from "../types";
import SearchItem from "../SearchItem";

const LocationSearchContainer = styled.div`
  flex: 1;
`;

interface LocationSearchProps {
  selected: boolean | null;
  onClick: () => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onClick,
  selected,
}) => {
  const [inputText, setInputText] = useState<SearchInput>();
  const [locationInputFocused, setLocationInputFocused] = useState(false);

  return (
    <LocationSearchContainer onClick={onClick}>
      <SearchItem selected={selected}>
        <LocationInput
          onFocus={(focused: boolean) => setLocationInputFocused(focused)}
          onTextChange={(text: string) => setInputText(text)}
        />
      </SearchItem>
      <LocationSearchResult
        inputText={inputText}
        isVisible={locationInputFocused}
      />
    </LocationSearchContainer>
  );
};

export default LocationSearch;
