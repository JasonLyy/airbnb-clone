import React from "react";
import { Route, Switch } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import Landing from "./components/pages/Landing";
import SearchHomes from "./components/pages/SearchHomes";

const AppContainer = styled.div``;

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <div style={{ maxWidth: "850px", margin: "auto" }}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/s/:location?/homes" component={SearchHomes} />
          </Switch>
        </div>
      </AppContainer>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
