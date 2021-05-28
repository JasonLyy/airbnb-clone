import React, { useRef, useState } from "react";
import styled from "styled-components";
import VerticalDivider from "../shared/VerticalDivider";
import LocationSearch from "./LocationSearch/index";
import BookingDates from "./BookingDates";
import { useOutsideAlerter } from "../../hooks/outsideAlerter";
import useGuestSelector, {
  Actions,
  GuestsState,
} from "./GuestsSelector/useGuestsSelector";
import { ComponentId } from "./enums";
import GuestsSelector from "./GuestsSelector";
import type { Moment } from "moment";
import { useHistory } from "react-router-dom";
import type { LocationState, LocationDescriptor } from "history";

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

const buildSearchQueryLink = (input: {
  locationText?: string;
  guests?: GuestsState;
  startDate: Moment | null;
  endDate: Moment | null;
}): LocationDescriptor<LocationState> => {
  const { locationText, guests, startDate, endDate } = input;

  // don't URL encode so that it's readable by users on first glance
  const destinationEncodedString = locationText
    ?.replace(/ +(?= )/g, "") // strip all spaces greater than 1
    .replaceAll(", ", "_")
    .replaceAll(" ", "-");

  const searchParams = new URLSearchParams();

  startDate && searchParams.append("checkin", startDate.format("DD/MM/YYYY"));
  endDate && searchParams.append("checkout", endDate.format("DD/MM/YYYY"));

  if (guests) {
    guests.adults !== 0 &&
      searchParams.append("adults", guests.adults.toString());
    guests.children !== 0 &&
      searchParams.append("children", guests.children.toString());
    guests.infants !== 0 &&
      searchParams.append("infants", guests.infants.toString());
  }

  return {
    pathname: `/s/${
      destinationEncodedString ? `${destinationEncodedString}/homes` : "homes"
    }`,
    search: searchParams.toString(),
  };
};

const SearchBar: React.FC = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSearchOption, setSelectedSearchOption] = useState<
    number | null
  >(null);

  const getSelectedStatus = (id: ComponentId) => {
    if (selectedSearchOption === null) return selectedSearchOption;
    return selectedSearchOption === id;
  };

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

  useOutsideAlerter(searchContainerRef, () => {
    setSelectedSearchOption(null);
  });

  const history = useHistory();

  //todo: Refactor how to represent when a component is selected. Current solution is 🤮. Possibly dynamically generate the options?
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
        onSearch={() =>
          history.push(
            buildSearchQueryLink({
              locationText: locationText,
              guests: guestsState,
              startDate: startDate,
              endDate: endDate,
            })
          )
        }
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
