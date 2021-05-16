import React from "react";
import styled from "styled-components";
import CardIcon from "./CardIcon";

const CardItemContainer = styled.div`
  display: flex;
  padding: 12px 24px 6px 24px;

  &:hover {
    background-color: ${(p) => p.theme.colors.secondaryBackground};
  }
`;

const CardText = styled.span`
  margin: auto 0;
  padding: 0 12px;
`;

type CardItemProp = {
  cardIcon?: React.ReactElement<SVGElement> | JSX.IntrinsicElements["img"];
  cardText: string;
  disableBorder?: boolean;
};

const CardItem: React.FC<CardItemProp> = ({
  cardIcon,
  cardText,
  disableBorder,
}) => {
  return (
    <CardItemContainer>
      <CardIcon cardIconImage={cardIcon} disableBorder={disableBorder} />
      <CardText>{cardText}</CardText>
    </CardItemContainer>
  );
};

export default CardItem;
