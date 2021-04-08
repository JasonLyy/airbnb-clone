import React, { useRef, useState } from "react";
import styled from "styled-components";
import VerticalDivider from "../shared/VerticalDivider";
import LocationSearch from "./LocationSearch/index";
import BookingDates from "./BookingDates";
import { useOutsideAlerter } from "../../hooks/outsideAlerter";
import useGuestSelector, { Actions } from "./GuestsSelector/useGuestsSelector";
import { ComponentId } from "./enums";
import GuestsSelector from "./GuestsSelector";
import type { Moment } from "moment";

const SearchContainer = styled.div<{ selected: boolean }>`
  position: relative;
  margin: 16px auto;
  border: 1px solid #dddddd;
  border-radius: 32px;
  width: 100%;
  height: 66px;
  display: flex;
  background-color: ${(p) => {
    return p.selected
      ? p.theme.colors.lighterPrimaryBackground
      : p.theme.colors.primaryBackground;
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

  const [locationText, setLocationText] = useState<string>();

  const [
    guestsState,
    dispatchGuestSelectorAction,
    canUpdateGuestsValue,
  ] = useGuestSelector({
    adults: 16,
    children: 5,
    infants: 5,
  });

  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  //todo: Refactor how to represent when a component is selected. Current solution is 🤮. Possibly dynamically generate the options?
  //todo: Refactor SearchContainer and all child components. Learning exercise
  return (
    <SearchContainer
      ref={searchContainerRef}
      selected={selectedSearchOption !== null}
    >
      <LocationSearch
        onClick={() => setSelectedSearchOption(ComponentId.LocationSearch)}
        selected={getSelectedStatus(ComponentId.LocationSearch)}
        locationText={locationText}
        setLocationText={(t?: string) => setLocationText(t)}
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
        startDate={startDate}
        endDate={endDate}
        setStartDate={(d: Moment | null) => setStartDate(d)}
        setEndDate={(d: Moment | null) => setEndDate(d)}
      />
      <VerticalDivider
        transparent={
          !!(
            getSelectedStatus(ComponentId.CheckOutDate) ||
            getSelectedStatus(ComponentId.Guests)
          )
        }
      />

      <GuestsSelector
        onClick={() => setSelectedSearchOption(ComponentId.Guests)}
        selected={getSelectedStatus(ComponentId.Guests)}
        guestsState={guestsState}
        dispatchGuestsSelectorAction={(actions: Actions) =>
          dispatchGuestSelectorAction({
            type: actions,
          })
        }
        canUpdateGuestsValue={canUpdateGuestsValue}
      />
    </SearchContainer>
  );
};

export default SearchBar;
