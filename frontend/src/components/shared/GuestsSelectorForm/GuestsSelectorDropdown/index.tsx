import React from "react";
import styled from "styled-components";
import GuestTypeQuantity from "./GuestTypeQuantity";
import {
  Actions,
  GuestsState,
  AdultsAction,
  ChildrenAction,
  InfantsAction,
} from "../useGuestsSelector";

const GuestsSelectorDropdownContainer = styled.div`
  position: absolute;
  width: 394px;
  max-height: calc(100vh - 220px);
  top: 100%;
  right: 0;
  overflow-y: auto;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  margin-top: 12px;
  padding: 16px 32px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 12px;
`;

interface GuestsSelectorDropdownProps {
  guestsState: GuestsState;
  dispatchGuestsSelectorAction: (action: Actions) => void;
  canUpdateGuestsValue: (action: Actions) => boolean;
}

const GuestsSelectorDropdown: React.FC<GuestsSelectorDropdownProps> = ({
  guestsState,
  dispatchGuestsSelectorAction,
  canUpdateGuestsValue,
}) => {
  return (
    <GuestsSelectorDropdownContainer>
      <GuestTypeQuantity
        title="Adults"
        subtitle="Ages 13 or above"
        decrement={() => dispatchGuestsSelectorAction(AdultsAction.Decrement)}
        increment={() => dispatchGuestsSelectorAction(AdultsAction.Increment)}
        reachedMin={!canUpdateGuestsValue(AdultsAction.Decrement)}
        reachedMax={!canUpdateGuestsValue(AdultsAction.Increment)}
        value={guestsState.adults}
        showDivider
      />

      <GuestTypeQuantity
        title="Children"
        subtitle="Ages 2-12"
        decrement={() => dispatchGuestsSelectorAction(ChildrenAction.Decrement)}
        increment={() => dispatchGuestsSelectorAction(ChildrenAction.Increment)}
        reachedMin={!canUpdateGuestsValue(ChildrenAction.Decrement)}
        reachedMax={!canUpdateGuestsValue(ChildrenAction.Increment)}
        value={guestsState.children}
        showDivider
      />

      <GuestTypeQuantity
        title="Infants"
        subtitle="Under 2"
        decrement={() => dispatchGuestsSelectorAction(InfantsAction.Decrement)}
        increment={() => dispatchGuestsSelectorAction(InfantsAction.Increment)}
        reachedMin={!canUpdateGuestsValue(InfantsAction.Decrement)}
        reachedMax={!canUpdateGuestsValue(InfantsAction.Increment)}
        value={guestsState.infants}
      />
    </GuestsSelectorDropdownContainer>
  );
};

export default GuestsSelectorDropdown;
