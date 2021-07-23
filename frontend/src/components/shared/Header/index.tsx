import React, { useRef, useState } from "react";
import AirBnbLogo from "../../../assets/logo.svg";
import FakeSearchBar from "./FakeSearchBar";
import styled from "styled-components";
import UserMenu from "App/components/UserMenu";
import { useOutsideAlerter } from "App/hooks/outsideAlerter";
import SearchBar from "App/components/shared/SearchBar";

const MainContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 12px;
`;

const Logo = styled(AirBnbLogo)`
  color: ${(p) => p.theme.colors.primary};
`;

const Header: React.VFC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(searchBarRef, () => {
    console.log("outisde clicked");
    setIsSearchOpen(false);
  });

  return (
    <>
      <MainContainer>
        <Logo />
        {isSearchOpen ? (
          <div />
        ) : (
          <FakeSearchBar onClick={() => setIsSearchOpen(true)} />
        )}
        <UserMenu />
      </MainContainer>

      {isSearchOpen && (
        <div ref={searchBarRef}>
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default Header;
