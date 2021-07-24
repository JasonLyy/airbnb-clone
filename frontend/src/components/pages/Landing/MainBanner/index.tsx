import React from "react";
import FrontBannerImage from "../../../../assets/front-banner.jpg";
import styled from "styled-components";

const FrontBanner = styled.img`
  content: url(${FrontBannerImage});
  width: 100%;
`;

const MainBanner: React.VFC = () => {
  return <FrontBanner />;
};

export default MainBanner;
