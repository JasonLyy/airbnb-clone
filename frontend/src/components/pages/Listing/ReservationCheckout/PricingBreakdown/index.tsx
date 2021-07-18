import HorizontalDivider from "App/components/shared/HorizontalDivider";
import React from "react";
import styled from "styled-components";

const PricingBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PricingBreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  margin-bottom: 2px;
`;
const PricingBreakdownCharge = styled.div`
  font-weight: ${(p) => p.theme.fontWeights.bold};
  color: ${(p) => p.theme.colors.primaryComponent};
`;

const PricingTotalCost = styled.div`
  font-size: 18px;
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const currencyFormat = (num: number) => {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

interface PricingBreakdownProps {
  price: number;
  nights: number;
  serviceFee: number;
}
const PricingBreakdown: React.VFC<PricingBreakdownProps> = ({
  price,
  nights,
  serviceFee,
}) => {
  return (
    <PricingBreakdownContainer>
      <PricingBreakdownItem>
        <PricingBreakdownCharge>
          {currencyFormat(price)} x {nights} {nights > 1 ? "nights" : "night"}
        </PricingBreakdownCharge>
        <div>{currencyFormat(price * nights)}</div>
      </PricingBreakdownItem>

      <PricingBreakdownItem>
        <PricingBreakdownCharge>Service Fee</PricingBreakdownCharge>
        <div>{currencyFormat(serviceFee)}</div>
      </PricingBreakdownItem>

      <HorizontalDivider />

      <PricingBreakdownItem>
        <PricingTotalCost>Total</PricingTotalCost>
        <PricingTotalCost>
          {currencyFormat(price * nights + serviceFee)}
        </PricingTotalCost>
      </PricingBreakdownItem>
    </PricingBreakdownContainer>
  );
};

export default PricingBreakdown;
