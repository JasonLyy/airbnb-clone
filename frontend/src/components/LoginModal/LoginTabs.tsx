import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

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

interface LoginTabsProps {
  tabState: TabState;
  onChange: (event: React.ChangeEvent<unknown>, value: TabState) => void;
}
const LoginTabs: React.FC<LoginTabsProps> = ({ tabState, onChange }) => {
  return (
    <TabContainer>
      <Tabs
        value={tabState}
        onChange={onChange}
        aria-label="disabled tabs example"
      >
        <StyledTab label="Sign up" />
        <StyledTab label="Sign in" />
      </Tabs>
    </TabContainer>
  );
};

export enum TabState {
  SIGNUP = 0,
  SIGNIN = 1,
}

export default LoginTabs;
