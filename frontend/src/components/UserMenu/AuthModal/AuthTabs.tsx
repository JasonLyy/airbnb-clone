import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { SelectedAuth } from "./const";

const TabContainer = styled.div`
  margin: auto;
`;

const StyledTab = styled(Tab)`
  &&& {
    color: ${(p) => p.theme.colors.primary};

    &.Mui-selected {
      border-bottom: ${(p) => p.theme.colors.primary};
    }
  }
`;

interface AuthTabsProps {
  selectedAuth: SelectedAuth;
  onChange: (event: React.ChangeEvent<unknown>, value: SelectedAuth) => void;
}
const AuthTabs: React.FC<AuthTabsProps> = ({
  selectedAuth = SelectedAuth.SIGNIN,
  onChange,
}) => {
  return (
    <TabContainer>
      <Tabs
        value={selectedAuth}
        onChange={onChange}
        aria-label="disabled tabs example"
      >
        <StyledTab label="Sign up" />
        <StyledTab label="Sign in" />
      </Tabs>
    </TabContainer>
  );
};

export default AuthTabs;
