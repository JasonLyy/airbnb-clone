import React from "react";
import styled from "styled-components";
import SearchIcon from "../../../../../assets/search-icon.svg";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex: 1 0;
`;

const Button = styled.button`
  min-width: 48px;
  height: 48px;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primaryTitleText};
  border-radius: 24px;
  border: 0px;
  outline: none;
  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.primaryDarker};
  }
`;

const ButtonText = styled.span`
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

type SearchButtonProps = {
  onButtonClick: () => void;
  selected?: boolean;
};

const SearchButton: React.FC<SearchButtonProps> = ({
  onButtonClick,
  selected = false,
}) => {
  return selected ? (
    <Button onClick={onButtonClick}>
      <Container>
        <SearchIcon />
      </Container>
    </Button>
  ) : (
    <Button onClick={onButtonClick}>
      <Container>
        <SearchIcon />
      </Container>
    </Button>
  );
};

export default SearchButton;
