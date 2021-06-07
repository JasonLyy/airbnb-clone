import React, { useRef, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { useOutsideAlerter } from "../../hooks/outsideAlerter";
import MenuDropdown from "./MenuDropdown";

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const AccountIcon = styled(AccountCircleIcon)`
  margin-left: 12px;
  &&& {
    width: 30px;
    height: 30px;
  }
`;

const Menu = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  display: inline-flex;
  margin-left: auto;
  align-items: center;
  border-radius: 21px;
  padding-left: 12px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #dddddd;
  outline: none;
  color: ${(p) => p.theme.colors.secondaryComponent};

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    cursor: pointer;
  }
`;

const UserMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(menuRef, () => {
    setMenuOpen(false);
  });

  return (
    <Navigation>
      <Menu ref={menuRef}>
        <MenuButton onClick={() => setMenuOpen((open) => !open)}>
          <MenuIcon />
          <AccountIcon />
        </MenuButton>

        {menuOpen && <MenuDropdown />}
      </Menu>
    </Navigation>
  );
};

export default UserMenu;
