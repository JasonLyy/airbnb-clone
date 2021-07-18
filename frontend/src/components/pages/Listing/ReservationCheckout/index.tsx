import PricingSummary from "App/components/shared/PricingSummary";
import ReviewSummary from "App/components/shared/ReviewSummary";
import React from "react";
import styled from "styled-components";
import PricingBreakdown from "./PricingBreakdown";
import ReservationForm from "./ReservationForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 35%;
  border: 2px solid ${(p) => p.theme.colors.secondaryBackground};
  border-radius: 16px;
  /* background-color: grey; */
`;

const ReservationSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReservationCheckout: React.VFC = () => {
  return (
    <Container>
      <ReservationSummaryContainer>
        <PricingSummary price={5000} nights={5} />
        <ReviewSummary reviews={5} ratings={5} />
      </ReservationSummaryContainer>

      <ReservationForm />

      <PricingBreakdown price={5000} nights={5} serviceFee={500} />
    </Container>
  );
};

export default ReservationCheckout;
