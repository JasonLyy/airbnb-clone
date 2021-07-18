import React from "react";
import styled from "styled-components";

const PricingContainer = styled.div`
  cursor: text;
`;

const PricingText = styled.span`
  font-weight: 1000;
  font-size: 18px;
`;

const PricingDurationText = styled.span`
  font-size: 18px;
`;

const currencyFormat = (num: number) => {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

interface PricingSummaryProps {
  price: number;
  nights: number;
}
const PricingSummary: React.VFC<PricingSummaryProps> = ({ price, nights }) => {
  return (
    <PricingContainer>
      <PricingText>{currencyFormat(price * nights)} AUD</PricingText>
      <PricingDurationText>
        {" "}
        / {nights > 1 ? "total" : "night"}{" "}
      </PricingDurationText>
    </PricingContainer>
  );
};

export default PricingSummary;
