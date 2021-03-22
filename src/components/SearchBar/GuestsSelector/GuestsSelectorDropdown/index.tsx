import React from "react";
import styled from "styled-components";
import GuestTypeQuantity from "./GuestTypeQuantity";
import { useMinMaxQuantity } from "../../../../hooks/minMaxQuantity";

const GuestsSelectorDropdownContainer = styled.div`
  background-color: ${(p) => p.theme.colors.primaryBackground};
  position: absolute;
  overflow-y: auto;
  border-radius: 32px;
  margin-top: 12px;
  padding: 16px 0px;
  z-index: 1;
  max-height: calc(100vh - 220px);
  width: 394px;
  position: absolute;
  right: 0px;
  top: 100%;
  padding: 16px 32px;
`;

interface GuestsSelectorDropdownProps {
  test?: boolean;
}

const GuestsSelectorDropdown: React.FC<GuestsSelectorDropdownProps> = ({}) => {
  const [
    decrementAdults,
    incrementAdults,
    reachedMinAdults,
    reachedMaxAdults,
    adultCount,
  ] = useMinMaxQuantity(0, 16);

  const [
    decrementChildren,
    incrementChildren,
    reachedMinChildren,
    reachedMaxChildren,
    childrenCount,
  ] = useMinMaxQuantity(0, 5);

  const [
    decrementInfants,
    incrementInfants,
    reachedMinInfants,
    reachedMaxInfants,
    infantsCount,
  ] = useMinMaxQuantity(0, 5);

  return (
    <GuestsSelectorDropdownContainer>
      <GuestTypeQuantity
        title="Adults"
        subtitle="Ages 13 or above"
        decrement={decrementAdults}
        increment={incrementAdults}
        reachedMin={reachedMinAdults}
        reachedMax={reachedMaxAdults}
        value={adultCount}
        showDivider
      />

      <GuestTypeQuantity
        title="Children"
        subtitle="Ages 2-12"
        decrement={decrementChildren}
        increment={incrementChildren}
        reachedMin={reachedMinChildren}
        reachedMax={reachedMaxChildren}
        value={childrenCount}
        showDivider
      />

      <GuestTypeQuantity
        title="Infants"
        subtitle="Under 2"
        decrement={decrementInfants}
        increment={incrementInfants}
        reachedMin={reachedMinInfants}
        reachedMax={reachedMaxInfants}
        value={infantsCount}
      />
    </GuestsSelectorDropdownContainer>
  );
};

export default GuestsSelectorDropdown;
