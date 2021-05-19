import React from "react";
import styled from "styled-components";

const Divider = styled.div`
  margin-top: 20px;
  margin-bottom: 4px;
  border-bottom: 1px solid #dddddd;
`;

const HorizontalDivider: React.FC = () => {
  return <Divider />;
};

export default HorizontalDivider;
