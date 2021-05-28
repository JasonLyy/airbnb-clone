import React from "react";
import styled, { css } from "styled-components";
import PreviousIcon from "../../../assets/next-icon.svg";
import NextIcon from "../../../assets/next-icon.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface PageButtonProps {
  disabled?: boolean;
}
const PageButton = styled.button<PageButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin: 0 auto;
  border-radius: 24px;
  width: 90px;
  height: 48px;

  ${(p) =>
    !p.disabled &&
    css`
      &:hover {
        cursor: pointer;
        background-color: ${(p) => p.theme.colors.lighterPrimaryBackground};
      }
    `}

  ${(p) =>
    p.disabled &&
    css`
      color: #dddddd;
    `}
`;

const Rotated = styled.div`
  transform: rotate(180deg);
`;

interface PaginatorProps {
  onPreviousClicked: () => void;
  onNextClicked: () => void;
  onPreviousDisabled: boolean;
  onNextDisabled: boolean;
}

const Paginator: React.FC<PaginatorProps> = ({
  onPreviousClicked,
  onNextClicked,
  onPreviousDisabled,
  onNextDisabled,
}) => {
  return (
    <Container>
      <PageButton onClick={onPreviousClicked} disabled={onPreviousDisabled}>
        <Rotated>
          <PreviousIcon />
        </Rotated>
        Previous
      </PageButton>
      <PageButton onClick={onNextClicked} disabled={onNextDisabled}>
        Next
        <NextIcon />
      </PageButton>
    </Container>
  );
};

export default Paginator;
