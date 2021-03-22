import React from "react";
import styled from "styled-components";
import DecrementIcon from "../../../../../assets/decrement-icon.svg";
import IncrementIcon from "../../../../../assets/increment-icon.svg";

type GuestTypeQuantityContainerProps = Pick<
  GuestTypeQuantityProps,
  "showDivider"
>;
const GuestTypeQuantityContainer = styled.div<GuestTypeQuantityContainerProps>`
  display: flex;
  justify-content: space-between;
  border-bottom: ${(p) =>
    p.showDivider && `1px solid ${p.theme.colors.secondaryBackground}`};
  padding-top: 16px;
  padding-bottom: 16px;
`;

const GuestTypeRowQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuestTypeRowQuantityItem = styled.div`
  padding: 0px 8px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${(p) => p.theme.colors.secondaryLighterComponent};
  border-radius: 50%;
  background: ${(p) => p.theme.colors.primaryBackground};
  color: ${(p) => p.theme.colors.secondaryComponent};
  outline: none;

  padding-left: 9px;

  &:hover {
    cursor: pointer;
    color: ${(p) => p.theme.colors.primaryComponent};
    border-color: ${(p) => p.theme.colors.primaryComponent};
  }

  &:disabled {
    cursor: default;
    color: ${(p) => p.theme.colors.secondaryBackground};
    border-color: ${(p) => p.theme.colors.secondaryBackground};
  }
`;

interface GuestTypeQuantityProps {
  title: string;
  subtitle: string;
  increment: () => void;
  decrement: () => void;
  value: number;
  reachedMin: boolean;
  reachedMax: boolean;
  showDivider?: boolean;
}

const GuestTypeQuantity: React.FC<GuestTypeQuantityProps> = ({
  title,
  subtitle,
  increment,
  decrement,
  value,
  reachedMin,
  reachedMax,
  showDivider,
}) => {
  return (
    <GuestTypeQuantityContainer showDivider={showDivider}>
      <div>
        <div>
          <strong>{title}</strong>
        </div>
        <div>{subtitle}</div>
      </div>

      <div>
        <GuestTypeRowQuantity>
          <GuestTypeRowQuantityItem>
            <QuantityButton onClick={decrement} disabled={reachedMin}>
              <DecrementIcon />
            </QuantityButton>
          </GuestTypeRowQuantityItem>

          <GuestTypeRowQuantityItem>{value}</GuestTypeRowQuantityItem>

          <GuestTypeRowQuantityItem>
            <QuantityButton onClick={increment} disabled={reachedMax}>
              <IncrementIcon />
            </QuantityButton>
          </GuestTypeRowQuantityItem>
        </GuestTypeRowQuantity>
      </div>
    </GuestTypeQuantityContainer>
  );
};

export default GuestTypeQuantity;
