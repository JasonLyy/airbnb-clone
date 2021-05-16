import React from "react";
import styled from "styled-components";

const Divider = styled.div<VerticalDividerProps>`
  height: 32px;
  border-right: 1px solid ${(p) => (p.transparent ? "transparent" : "#dddddd")};
  flex: 0 0 0px;
  align-self: center;
`;

interface VerticalDividerProps {
  transparent?: boolean;
}

const VerticalDivider: React.FC<VerticalDividerProps> = ({
  transparent = false,
}) => {
  return <Divider transparent={transparent} />;
};

export default VerticalDivider;
