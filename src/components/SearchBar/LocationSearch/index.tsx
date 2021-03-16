import React, { useState } from "react";
import styled from "styled-components";
import SearchInput from "../common/SearchInput";
import SearchItem from "../common/SearchItem";
import LocationSearchResult from "./LocationSearchResult";

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
  const [inputText, setInputText] = useState<string | undefined>();

  return (
    <LocationSearchContainer onClick={onClick}>
      <SearchItem selected={selected}>
        <SearchInput
          onTextChange={(text: string) => setInputText(text)}
          title="Location"
          placeholder="Where are you going?"
        />
      </SearchItem>
      <LocationSearchResult inputText={inputText} isVisible={!!selected} />
    </LocationSearchContainer>
  );
};

export default LocationSearch;
