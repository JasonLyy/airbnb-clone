import React from "react";
import styled from "styled-components";
import SearchItem from "../common/SearchItem";
import SearchInput from "../common/SearchInput";
import GuestsSelectorDropdown from "../../GuestsSelectorForm/GuestsSelectorDropdown";
import SearchButton from "./SearchButton";
import {
  Actions,
  GuestsState,
} from "../../GuestsSelectorForm/useGuestsSelector";

const GuestSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const generateSelectedGuestsText = (guestsState: GuestsState) => {
  const { adults, children, infants } = guestsState;

  if (infants && adults && children) {
    return `${adults + children} guests, ${infants} infants`;
  }

  if (!infants && (adults || children)) {
    return `${adults + children} guests`;
  }

  return "";
};

interface GuestsSelectorProps {
  onClick: () => void;
  onSearch: () => void;
  selected: boolean | null;
  guestsState: GuestsState;
  dispatchGuestsSelectorAction: (action: Actions) => void;
  canUpdateGuestsValue: (action: Actions) => boolean;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  onClick,
  onSearch,
  selected,
  guestsState,
  dispatchGuestsSelectorAction,
  canUpdateGuestsValue,
}) => {
  return (
    <>
      <SearchItem selected={selected} onClick={onClick} flexGrow={1.2}>
        <GuestSelectorContainer>
          <SearchInput
            title="Guests"
            placeholder="Add guests"
            text={generateSelectedGuestsText(guestsState)}
            disabled
          />

          <SearchButton onButtonClick={onSearch} selected={selected || false}>
            Search
          </SearchButton>
        </GuestSelectorContainer>
      </SearchItem>

      {selected && (
        <GuestsSelectorDropdown
          guestsState={guestsState}
          dispatchGuestsSelectorAction={dispatchGuestsSelectorAction}
          canUpdateGuestsValue={canUpdateGuestsValue}
        />
      )}
    </>
  );
};

export default GuestsSelector;
