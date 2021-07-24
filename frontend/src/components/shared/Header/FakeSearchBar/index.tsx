import React from "react";
import SearchIcon from "../../../../assets/search-icon.svg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  justify-content: space-between;
  align-items: center;
  border-radius: 32px;
  border: 1px solid #dddddd;
  width: 100%;
  max-width: 400px;
  margin: 17px 0;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 12px;
  }
`;

const Text = styled.div`
  margin-left: 16px;
  font-size: 16px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 48px;
  height: 48px;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primaryTitleText};
  border-radius: 24px;
  border: 0px;
  outline: none;
  margin: 8px;
`;

const FakeSearchBar: React.VFC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <Text>Start Your Search</Text>
      <Button>
        <SearchIcon />
      </Button>
    </Container>
  );
};

export default FakeSearchBar;
