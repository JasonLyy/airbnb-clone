import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchItem from "./common/SearchItem";
import VerticalDivider from "../shared/VerticalDivider";
import LocationSearch from "./LocationSearch/index";
import BookingDates from "./BookingDates";
import { useOutsideAlerter } from "../../hooks/outsideAlerter";
import { ComponentId } from "./enums";

const SearchContainer = styled.div`
  position: relative;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  margin: 16px auto;
  border: 1px solid #dddddd;
  border-radius: 32px;
  width: 100%;
  max-width: 850px; //temp
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

  const getSelectedStatus = (id: ComponentId) => {
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
        onClick={() => setSelectedSearchOption(ComponentId.LocationSearch)}
        selected={getSelectedStatus(ComponentId.LocationSearch)}
      />
      <VerticalDivider
        transparent={
          !!(
            getSelectedStatus(ComponentId.LocationSearch) ||
            getSelectedStatus(ComponentId.CheckInDate)
          )
        }
      />
      <BookingDates
        getSelectedStatus={getSelectedStatus}
        setSelectedId={(id: ComponentId) => setSelectedSearchOption(id)}
        selectedId={selectedSearchOption}
      />
      <VerticalDivider
        transparent={
          !!(
            getSelectedStatus(ComponentId.CheckOutDate) ||
            getSelectedStatus(ComponentId.Guests)
          )
        }
      />
      <SearchItem
        onClick={() => setSelectedSearchOption(ComponentId.Guests)}
        selected={getSelectedStatus(ComponentId.Guests)}
      >
        <div>Guests</div>
      </SearchItem>
    </SearchContainer>
  );
};

export default SearchBar;
