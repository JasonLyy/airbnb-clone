import React from "react";
import styled from "styled-components";

const CardIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  min-height: 48px;
  min-width: 48px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.secondaryBackground};
  border: 1px solid
    rgba(
      176,
      176,
      176,
      ${(p: CardIconProps) => (p.disableBorder ? "0" : "0.2")}
    );
`;

type CardIconProps = {
  disableBorder?: boolean;
  cardIconImage?: React.ReactElement<SVGElement> | JSX.IntrinsicElements["img"];
};

const CardIcon: React.FC<CardIconProps> = ({
  cardIconImage,
  disableBorder,
}) => {
  return (
    <CardIconContainer disableBorder={disableBorder}>
      {cardIconImage}
    </CardIconContainer>
  );
};

export default CardIcon;
