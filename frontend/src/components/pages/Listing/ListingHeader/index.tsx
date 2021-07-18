import React from "react";
import ReviewSummary from "App/components/shared/ReviewSummary";
import styled from "styled-components";

const ListingSummary = styled.div`
  display: flex;
`;

const ListingSummaryItem = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  font-size: 14px;
`;

const MedalIcon = styled.span`
  font-size: 16px;
  color: ${(p) => p.theme.colors.primary};
`;

interface ListingHeaderProps {
  heading: string;
  ratings: number;
  reviews: number;
  isSuperHost?: boolean;
  location: string;
}

const SuperHostListingSummaryItem = () => {
  return (
    <>
      <ListingSummaryItem>
        <MedalIcon>󰀃</MedalIcon>
      </ListingSummaryItem>
      <ListingSummaryItem>Superhost</ListingSummaryItem>
      <ListingSummaryItem>·</ListingSummaryItem>
    </>
  );
};

const ListingHeader: React.VFC<ListingHeaderProps> = ({
  heading,
  reviews,
  ratings,
  isSuperHost,
  location,
}) => {
  return (
    <div>
      <h1>{heading}</h1>
      <ListingSummary>
        <ReviewSummary reviews={reviews} ratings={ratings} />
        <ListingSummaryItem>·</ListingSummaryItem>
        {isSuperHost && SuperHostListingSummaryItem()}
        <ListingSummaryItem>{location}</ListingSummaryItem>
      </ListingSummary>
    </div>
  );
};

export default ListingHeader;
