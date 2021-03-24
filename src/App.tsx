import React from "react";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";

const AppContainer = styled.div``;

const App: React.FC = () => {
  return (
    <AppContainer>
      <div style={{ maxWidth: "850px", margin: "auto" }}>
        <SearchBar />
      </div>
    </AppContainer>
  );
};

export default App;
