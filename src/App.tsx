import React from "react";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";

const AppContainer = styled.div``;

const App: React.FC = () => {
  return (
    <AppContainer>
      <SearchBar />
    </AppContainer>
  );
};

export default App;
