import React, { useRef } from "react";
import GuestsSelectorDropdown from "App/components/shared/GuestsSelectorForm/GuestsSelectorDropdown";
import {
  Actions,
  GuestsState,
} from "App/components/shared/GuestsSelectorForm/useGuestsSelector";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import styled from "styled-components";
import { useOutsideAlerter } from "App/hooks/outsideAlerter";

const DropdownField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.26);
  border-radius: 4px;
  padding: 8px;

  :hover {
    border: 1px solid black;
    cursor: pointer;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
`;

interface GuestsSelectorProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  guestsState: GuestsState;
  dispatchGuestsSelectorAction: (action: Actions) => void;
  canUpdateGuestsValue: (action: Actions) => boolean;
}
const GuestsSelector: React.VFC<GuestsSelectorProps> = ({
  open,
  setOpen,
  guestsState,
  dispatchGuestsSelectorAction,
  canUpdateGuestsValue,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(dropDownRef, () => {
    setOpen(false);
  });

  return (
    <>
      <DropdownField onClick={() => setOpen(!open)}>
        {guestsState.adults + guestsState.children + guestsState.infants} Guests
        {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </DropdownField>
      {open && (
        <div ref={dropDownRef}>
          <Dropdown>
            <GuestsSelectorDropdown
              guestsState={guestsState}
              dispatchGuestsSelectorAction={dispatchGuestsSelectorAction}
              canUpdateGuestsValue={canUpdateGuestsValue}
            />
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default GuestsSelector;
