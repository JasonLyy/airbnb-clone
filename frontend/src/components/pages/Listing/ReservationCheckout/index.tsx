import PricingSummary from "App/components/shared/PricingSummary";
import ReviewSummary from "App/components/shared/ReviewSummary";
import { Moment } from "moment";
import React from "react";
import styled from "styled-components";
import PricingBreakdown from "./PricingBreakdown";
import ReservationForm from "./ReservationForm";

const Container = styled.div`
  display: inline-flex;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  position: sticky;
  top: 0;
  /* float: right; */
  flex: 0 0 auto;
  flex-direction: column;
  padding: 20px;
  width: 35%;
  max-height: 350px;
  border: 2px solid ${(p) => p.theme.colors.secondaryBackground};
  border-radius: 16px;
`;

const ReservationSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ReservationCheckoutProps {
  price: number;
  review: number;
  rating: number;
  nights?: number;
  adults?: number;
  children?: number;
  infants?: number;
  checkIn?: Moment | null;
  checkOut?: Moment | null;
  setStartDate: (m: Moment | null) => void;
  setEndDate: (m: Moment | null) => void;
}
const ReservationCheckout: React.VFC<ReservationCheckoutProps> = ({
  price,
  review,
  rating,
  nights,
  adults,
  children,
  infants,
  checkIn,
  checkOut,
  setStartDate,
  setEndDate,
}) => {
  return (
    <Container>
      <ReservationSummaryContainer>
        <PricingSummary price={price} nights={nights || 1} />
        <ReviewSummary reviews={review} ratings={rating} />
      </ReservationSummaryContainer>

      <ReservationForm
        adults={adults}
        infants={infants}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        checkIn={checkIn}
        checkOut={checkOut}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <PricingBreakdown
        price={price}
        nights={nights || 1}
        serviceFee={price * 0.1}
      />
    </Container>
  );
};

export default ReservationCheckout;
