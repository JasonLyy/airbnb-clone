import React from "react";
import styled from "styled-components";
import SearchItem from "../common/SearchItem";
import SearchInput from "../common/SearchInput";
import GuestsSelectorDropdown from "./GuestsSelectorDropdown";
import SearchButton from "./SearchButton";
import { Actions, GuestsState } from "./useGuestsSelector";

const GuestSelectorContainer = styled.div`
  display: flex;
`;

interface GuestsSelectorProps {
  onClick: () => void;
  selected: boolean | null;
  guestsState: GuestsState;
  dispatchGuestsSelectorAction: (action: Actions) => void;
  canUpdateGuestsValue: (action: Actions) => boolean;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  onClick,
  selected,
  guestsState,
  dispatchGuestsSelectorAction,
  canUpdateGuestsValue,
}) => {
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
          {/* todo: SearchButton supports expanding to have Search */}
          <SearchButton />
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
