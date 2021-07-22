import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: ${(p) => p.theme.colors.lighterPrimaryBackground};
  height: 550px;
  position: relative;
`;

const FooterText = styled.div`
  position: absolute;
  bottom: 0;
`;

const Footer: React.VFC = () => {
  return (
    <FooterContainer>
      <FooterText>AirBnb Clone</FooterText>
    </FooterContainer>
  );
};

export default Footer;
