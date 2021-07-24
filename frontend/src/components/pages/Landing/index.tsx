import React from "react";
import { AppContext } from "App/auth/auth";
import Header from "App/components/shared/Header";
import { useContext } from "react";
import Footer from "App/components/shared/Footer";
import styled from "styled-components";
import MainBanner from "./MainBanner";
import LiveAnywhere from "./LiveAnywhere";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 80%;
`;

const Landing: React.FC = () => {
  const authContext = useContext(AppContext);

  return (
    <>
      <Header sticky />
      <MainBanner />
      <Body>
        <LiveAnywhere />
      </Body>
      <Footer />
    </>
  );
};

export default Landing;
