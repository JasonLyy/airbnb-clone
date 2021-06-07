import React from "react";
import styled from "styled-components";

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

const MenuDropdown: React.FC = () => {
  return (
    <Menu>
      <MenuItem>Sign Up</MenuItem>
      <MenuItem>Login</MenuItem>
    </Menu>
  );
};

export default MenuDropdown;
