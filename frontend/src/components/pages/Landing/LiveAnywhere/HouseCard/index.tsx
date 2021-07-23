import React from "react";
import styled from "styled-components";

const HouseImage = styled.img<Partial<HouseCardProps>>`
  width: 320px;
  content: url(${(p) => p.url});
  margin: 0;
  padding: 0;
  border-radius: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface HouseCardProps {
  url: string;
  title: string;
}
const HouseCard: React.VFC<HouseCardProps> = ({ url, title }) => {
  return (
    <Container>
      <HouseImage url={url} />
      <h2>{title}</h2>
    </Container>
  );
};

export default HouseCard;
