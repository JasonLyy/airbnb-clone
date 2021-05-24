import React from "react";
import styled from "styled-components";
import { ListingInfoFieldsFragment } from "../__generated__/queries.generated";
import ListingCard from "./ListingCard";
import HorizontalDivider from "./ListingCard/HorizontalDivider";

const ResultsContainer = styled.div`
  background-color: white;
  flex: 1 1;
  max-width: 920px;
  min-width: 589px;
  width: 840px;
  margin-left: 16px;
  margin-right: 16px;
`;

const Heading = styled.div`
  font-weight: 900;
  font-size: 32px;
  color: ${(p) => p.theme.colors.primaryComponent};
  padding-bottom: 8px;
`;

const Subheading = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.primaryComponent};
`;

interface ResultsProps {
  listings: ListingInfoFieldsFragment[];
  totalResults: number;
}

//todo: review how we handle nullable options. It could be that these fields aint nullable but ceebs fixing right now.
const createListingCards = (listings: ListingInfoFieldsFragment[]) =>
  listings.map((listings) => {
    const {
      id,
      name,
      accommodates,
      beds,
      bedrooms,
      bathrooms,
      amenities,
      price,
      reviews,
      rating,
      pictureUrl,
    } = listings;

    return (
      <>
        <ListingCard
          key={id}
          subheading={""}
          heading={name ?? ""}
          guests={accommodates ?? -1}
          beds={beds ?? -1}
          bedroom={bedrooms ?? -1}
          bathroom={bathrooms ?? -1}
          amenities={amenities.slice(0, 5) ?? []}
          price={price ?? -1}
          nights={10}
          reviews={reviews ?? -1}
          ratings={rating ?? -1}
          pictureUrl={pictureUrl ?? ""}
        />
        <HorizontalDivider />
      </>
    );
  });

const Results: React.FC<ResultsProps> = ({
  listings,
  totalResults,
  children,
}) => {
  return (
    <ResultsContainer>
      <Heading>Places to stay near you</Heading>
      <Subheading>Explore all {totalResults} stays</Subheading>
      {createListingCards(listings)}
      {children}
    </ResultsContainer>
  );
};

export default Results;
