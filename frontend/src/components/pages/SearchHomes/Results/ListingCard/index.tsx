import ListingCapcitySummary from "App/components/shared/ListingCapcitySummary";
import PricingSummary from "App/components/shared/PricingSummary";
import ReviewSummary from "App/components/shared/ReviewSummary";
import React from "react";
import styled, { css } from "styled-components";
import ListingImage from "./ListingImage";

const CardContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 24px;
  margin-right: 8px;
  height: 200px;
  cursor: pointer;
`;
const Description = styled.div`
  background-color: white;
  position: relative;
  margin-left: 8px;
  flex: 2 1;
`;

const Heading = styled.div`
  color: ${(p) => p.theme.colors.primaryComponent};
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const subTextStyles = css`
  color: ${(p) => p.theme.colors.secondaryComponent};
  font-size: 14px;
`;

const Subheading = styled.div`
  ${subTextStyles}
`;

const SubText = styled.span`
  ${subTextStyles}
`;

const Divider = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 11px;
  width: 32px;
`;

const Amenities = styled.div`
  margin-top: 4px;
`;

const BottomContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
`;

interface ListingCardProps {
  subheading: string;
  heading: string;
  guests: number;
  beds: number;
  bedroom: number;
  bathroom: number;
  amenities: string[];
  price: number;
  nights: number;
  reviews: number;
  ratings: number;
  pictureUrl: string;
}

const buildAmenitiesText = (amenities: string[]) => (
  <Amenities>
    {amenities.map((amenity, index) => (
      <>
        <SubText key={amenity}>{amenity}</SubText>
        {index != amenities.length - 1 && <SubText> · </SubText>}
      </>
    ))}
  </Amenities>
);

const ListingCard: React.FC<
  ListingCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  subheading,
  heading,
  guests,
  beds,
  bedroom,
  bathroom,
  amenities,
  price,
  nights,
  reviews,
  ratings,
  pictureUrl,
  onClick,
}) => {
  return (
    <CardContainer onClick={onClick} key={heading}>
      <ListingImage url={pictureUrl} />
      <Description>
        <Subheading>{subheading}</Subheading>
        <Heading>{heading}</Heading>
        <Divider />
        <ListingCapcitySummary
          guests={guests}
          bedroom={bedroom}
          bathroom={bathroom}
          beds={beds}
        />
        {buildAmenitiesText(amenities)}
        <BottomContainer>
          <ReviewSummary ratings={ratings} reviews={reviews} />
          <PricingSummary price={price} nights={nights} />
        </BottomContainer>
      </Description>
    </CardContainer>
  );
};

export default ListingCard;
