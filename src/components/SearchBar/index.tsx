import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import VerticalDivider from "../shared/VerticalDivider";
import LocationSearch from "./LocationSearch/index";
import { useOutsideAlerter } from "../../hooks/outsideAlerter";

const SearchContainer = styled.div`
  background-color: ${(p) => p.theme.colors.primaryBackground};
  margin: 16px auto;
  border: 1px solid #dddddd;
  border-radius: 32px;
  width: 50%;
  height: 66px;
  display: flex;
  justify-content: center;
  background-color: ${(p: { selected: boolean }) => {
    return p.selected
      ? "#f7f7f7"
      : "#ffffff"; /** use theme background colors */
  }};
`;

const SearchBar: React.FC = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSearchOption, setSelectedSearchOption] = useState<
    number | null
  >(null);

  const getSelectedStatus = (id: number) => {
    if (selectedSearchOption === null) return selectedSearchOption;
    return selectedSearchOption === id;
  };

  useOutsideAlerter(searchContainerRef, () => {
    setSelectedSearchOption(null);
  });

  //todo: Refactor how to represent when a component is selected. Current solution is 🤮. Possibly dynamically generate the options?
  return (
    <SearchContainer
      ref={searchContainerRef}
      selected={selectedSearchOption !== null}
    >
      <LocationSearch
        onClick={() => setSelectedSearchOption(1)}
        selected={getSelectedStatus(1)}
      />
      <VerticalDivider
        transparent={!!(getSelectedStatus(1) || getSelectedStatus(2))}
      />
      <SearchItem
        onClick={() => setSelectedSearchOption(2)}
        selected={getSelectedStatus(2)}
      >
        <div>Check In</div>
      </SearchItem>
      <VerticalDivider
        transparent={!!(getSelectedStatus(2) || getSelectedStatus(3))}
      />
      <SearchItem
        onClick={() => setSelectedSearchOption(3)}
        selected={getSelectedStatus(3)}
      >
        <div>Check Out</div>
      </SearchItem>
      <VerticalDivider
        transparent={!!(getSelectedStatus(3) || getSelectedStatus(4))}
      />
      <SearchItem
        onClick={() => setSelectedSearchOption(4)}
        selected={getSelectedStatus(4)}
      >
        <div>Guests</div>
      </SearchItem>
    </SearchContainer>
  );
};

export default SearchBar;
