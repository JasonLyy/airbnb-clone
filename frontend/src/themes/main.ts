import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends FontWeights {
    colors: {
      primary: string;
      primaryDarker: string;
      primaryBackground: string;
      lighterPrimaryBackground: string;
      secondaryBackground: string;
      primaryTitleText: string;
      primaryComponent: string;
      secondaryComponent: string;
      secondaryLighterComponent: string;
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
    primary: "#FF385C",
    primaryDarker: "#E31C5F",
    primaryBackground: "#FFFFFF",
    lighterPrimaryBackground: "#F7F7F7",
    secondaryBackground: "#EBEBEB",
    primaryTitleText: "#FFFFFF",
    primaryComponent: "#222222",
    secondaryComponent: "#717171",
    secondaryLighterComponent: "#B0B0B0",
    alternativePrimary: "#008489",
    alternativeSecondary: "#FC642D",
  },

  ...fontWeights,
};
