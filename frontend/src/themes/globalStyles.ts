import { createGlobalStyle } from "styled-components";
import AirbnbCerealLightTtf from "./fonts/AirbnbCerealLight.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Airbnb Cereal App Light";
    src: url(${AirbnbCerealLightTtf}) format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    font-size: 14px;
    color: ${(p) => p.theme.colors.primaryComponent};
    font-family: "Airbnb Cereal App Light", Roboto, "Helvetica Neue", sans-serif, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
