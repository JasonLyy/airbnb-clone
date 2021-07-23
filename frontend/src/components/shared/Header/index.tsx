import React, { useRef, useState } from "react";
import AirBnbLogo from "../../../assets/logo.svg";
import FakeSearchBar from "./FakeSearchBar";
import styled, { css } from "styled-components";
import UserMenu from "App/components/shared/UserMenu";
import { useOutsideAlerter } from "App/hooks/outsideAlerter";
import SearchBar from "App/components/shared/SearchBar";

const MainContainer = styled.div<HeaderProps>`
  display: flex;
  ${(p) =>
    p.sticky &&
    css`
      position: sticky;
      top: 0;
    `}

  flex-direction: column;
  padding: 16px 32px;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 12px;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Logo = styled(AirBnbLogo)`
  color: ${(p) => p.theme.colors.primary};
  margin-top: 8px;
`;

const Menu = styled(UserMenu)`
  position: relative;
`;

interface HeaderProps {
  sticky?: boolean;
}
const Header: React.VFC<HeaderProps> = ({ sticky = false }) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(searchBarRef, () => {
    setIsSearchOpen(false);
  });

  return (
    <>
      <MainContainer sticky={sticky}>
        <TopRow>
          <a href="/">
            <Logo />
          </a>
          {isSearchOpen ? (
            <div />
          ) : (
            <FakeSearchBar onClick={() => setIsSearchOpen(true)} />
          )}
          <Menu />
        </TopRow>

        {isSearchOpen && (
          <div ref={searchBarRef}>
            <SearchBar />
          </div>
        )}
      </MainContainer>
    </>
  );
};

export default Header;
