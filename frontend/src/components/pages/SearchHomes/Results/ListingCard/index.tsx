import React from "react";
import styled, { css } from "styled-components";
import Star from "../../../../../assets/review-star.svg";
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

const ListingCapacity = styled.div`
  margin-top: 9px;
`;

const Amenities = styled.div`
  margin-top: 4px;
`;

const ReviewStar = styled.svg`
  width: 14px;
  height: 14px;
  color: ${(p) => p.theme.colors.primary};
`;

const Review = styled.div`
  display: block;
`;

const Rating = styled.span`
  font-weight: 600;
  margin-left: 4px;
`;

const ReviewCount = styled.span`
  margin-left: 4px;
  color: ${(p) => p.theme.colors.secondaryComponent};
  font-size: 14px;
`;

const BottomContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
`;

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

const currencyFormat = (num: number) => {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const buildListingCapcityText = ({
  guests,
  beds,
  bathroom,
  bedroom,
}: Pick<ListingCardProps, "guests" | "bedroom" | "bathroom" | "beds">) => {
  return (
    <ListingCapacity>
      <SubText>{guests} guests</SubText>
      <SubText> · </SubText>
      <SubText>{bedroom} bedrooms</SubText>
      <SubText> · </SubText>
      <SubText>{beds} beds</SubText>
      <SubText> · </SubText>
      <SubText>{bathroom} baths</SubText>
    </ListingCapacity>
  );
};

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
        {buildListingCapcityText({
          guests,
          bedroom,
          beds,
          bathroom,
        })}
        {buildAmenitiesText(amenities)}
        <BottomContainer>
          <Review>
            <ReviewStar as={Star} />
            <Rating>{ratings.toFixed(2)}</Rating>
            <ReviewCount>({reviews} reviews)</ReviewCount>
          </Review>
          <PricingContainer>
            <PricingText>{currencyFormat(price * nights)} AUD</PricingText>
            <PricingDurationText>
              {" "}
              / ${nights > 1 ? "total" : "night"}{" "}
            </PricingDurationText>
          </PricingContainer>
        </BottomContainer>
      </Description>
    </CardContainer>
  );
};

export default ListingCard;
