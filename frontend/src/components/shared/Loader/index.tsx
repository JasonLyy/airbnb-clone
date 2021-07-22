import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loader: React.VFC = () => {
  return (
    <LoaderContainer>
      <CircularProgress color="secondary" />
    </LoaderContainer>
  );
};

export default Loader;
