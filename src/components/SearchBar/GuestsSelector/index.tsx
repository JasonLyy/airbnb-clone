import React from "react";
import SearchItem from "../common/SearchItem";
import SearchInput from "../common/SearchInput";
import GuestsSelectorDropdown from "./GuestsSelectorDropdown";

interface GuestsSelectorProps {
  onClick: () => void;
  selected: boolean | null;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  onClick,
  selected,
}) => {
  return (
    <div onClick={onClick}>
      <SearchItem selected={selected}>
        <SearchInput title="Guests" placeholder="Add guests" disabled />
      </SearchItem>
      {selected && <GuestsSelectorDropdown />}
    </div>
  );
};

export default GuestsSelector;
