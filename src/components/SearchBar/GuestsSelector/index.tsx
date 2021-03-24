import React from "react";
import styled from "styled-components";
import SearchItem from "../common/SearchItem";
import SearchInput from "../common/SearchInput";
import GuestsSelectorDropdown from "./GuestsSelectorDropdown";
import SearchButton from "./SearchButton";

const GuestSelectorContainer = styled.div`
  display: flex;
`;

interface GuestsSelectorProps {
  onClick: () => void;
  selected: boolean | null;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  onClick,
  selected,
}) => {
  return (
    <>
      <SearchItem selected={selected} onClick={onClick} flexGrow={1.2}>
        <GuestSelectorContainer>
          <SearchInput title="Guests" placeholder="Add guests" disabled />
          {/* todo: SearchButton supports expanding to have Search */}
          <SearchButton />
        </GuestSelectorContainer>
      </SearchItem>

      {selected && <GuestsSelectorDropdown />}
    </>
  );
};

export default GuestsSelector;
