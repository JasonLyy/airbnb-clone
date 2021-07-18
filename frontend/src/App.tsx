import React from "react";
import { Route, Switch } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import Listing from "./components/pages/Listing";
import Landing from "./components/pages/Landing";
import SearchHomes from "./components/pages/SearchHomes";
import { AppContextProvider, AuthInterceptors } from "./auth/auth";

const AppContainer = styled.div``;

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <AuthInterceptors>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppContainer>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/s/:location?/homes" component={SearchHomes} />
              <Route path="/listing" component={Listing} />
            </Switch>
          </AppContainer>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </AppContextProvider>
    </AuthInterceptors>
  );
};

export default App;
