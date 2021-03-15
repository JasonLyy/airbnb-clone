import { createGlobalStyle } from "styled-components";
import AirbnbCerealLightTtf from "./fonts/AirbnbCerealLight.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Airbnb Cereal App Light";
    src: url(${AirbnbCerealLightTtf}) format("truetype");
    font-weight: normal;
    font-style: normal;
  }


  /* ${(p) => p.theme.colors.primaryBackground}; */
  body {
    margin: 0;
    background: grey;
    font-size: 14px;
    color: ${(p) => p.theme.colors.primaryText};
    font-family: "Airbnb Cereal App Light", Roboto, "Helvetica Neue", sans-serif, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
