import React from "react";
import styled, { css } from "styled-components";

const subTextStyles = css`
  color: ${(p) => p.theme.colors.secondaryComponent};
  font-size: 14px;
`;
const SubText = styled.span`
  ${subTextStyles}
`;

const ListingCapacity = styled.div`
  margin-top: 9px;
`;

const buildListingCapcityText = ({
  guests,
  beds,
  bathroom,
  bedroom,
}: ListingCapcitySummaryProps) => {
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

type ListingCapcitySummaryProps = {
  guests: number;
  beds: number;
  bathroom: number;
  bedroom: number;
};

const ListingCapcitySummary: React.VFC<ListingCapcitySummaryProps> = ({
  ...props
}) => {
  return buildListingCapcityText(props);
};

export default ListingCapcitySummary;
