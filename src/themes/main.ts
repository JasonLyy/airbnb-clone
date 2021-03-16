import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends FontWeights {
    colors: {
      primary: string;
      primaryBackground: string;
      lighterPrimaryBackground: string;
      secondaryBackground: string;
      primaryTitleText: string;
      primaryText: string;
      secondaryText: string;
      alternativePrimary: string;
      alternativeSecondary: string;
    };
  }
}

interface FontWeights {
  fontWeights: {
    light: number;
    normal: number;
    bold: number;
  };
}

const fontWeights = {
  fontWeights: {
    light: 200,
    normal: 400,
    bold: 800,
  },
};

export const mainTheme: DefaultTheme = {
  colors: {
    primary: "#FF5A5F",
    primaryBackground: "#FFFFFF",
    lighterPrimaryBackground: "#F7F7F7",
    secondaryBackground: "#EBEBEB",
    primaryTitleText: "#FFFFFF",
    primaryText: "#222222",
    secondaryText: "#717171",
    alternativePrimary: "##008489",
    alternativeSecondary: "#FC642D",
  },

  ...fontWeights,
};