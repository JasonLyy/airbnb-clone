import { AppContext } from "App/auth/auth";
import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useLogoutGuestMutation } from "./__generated__/mutations.generated";

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  border-radius: 12px;
  box-shadow: rgb(0, 0, 0, 12) 0px 2px 16px;
  color: ${(p) => p.theme.colors.primaryComponent};
  margin-top: 34px;
  padding: 8px 0px;
  position: absolute;
  top: 50%;
  right: 0;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  z-index: 2;
  min-width: 240px;
`;

const MenuItem = styled.a`
  padding: 12px 16px;

  &:hover {
    background-color: ${(p) => p.theme.colors.secondaryBackground};
    cursor: pointer;
  }
`;

interface MenuDropdownProps {
  onSignupClick: () => void;
  onLoginClick: () => void;
}
const MenuDropdown: React.FC<MenuDropdownProps> = ({
  onSignupClick,
  onLoginClick,
}) => {
  const history = useHistory();

  const { isLoggedIn } = useContext(AppContext);
  const { mutate: logoutGuest } = useLogoutGuestMutation({
    onSuccess: () => {
      history.push("/");
      window.location.reload();
    },
  });

  const logout = () => {
    logoutGuest({});
  };

  const unAuthedMenu = (
    <Menu>
      <MenuItem onClick={onSignupClick}>Sign Up</MenuItem>
      <MenuItem onClick={onLoginClick}>Login</MenuItem>
    </Menu>
  );

  const authedMenu = (
    <Menu>
      <MenuItem>Insert Relevant Item That Requires Auth Here</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return isLoggedIn ? authedMenu : unAuthedMenu;
};

export default MenuDropdown;
