import React from "react";
import styled from "styled-components";
import SearchIcon from "../../../../assets/search-icon.svg";

const Button = styled.button`
  min-width: 48px;
  height: 48px;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primaryTitleText};
  border-radius: 24px;
  border: 0px;
  padding-left: 16px;
  margin-top: 8px;
  margin-right: 8px;
  overflow: hidden;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.primaryDarker};
  }
`;

type SearchButtonProps = {
  onButtonClick: () => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onButtonClick }) => {
  return (
    <Button onClick={onButtonClick}>
      <SearchIcon />
    </Button>
  );
};

export default SearchButton;
