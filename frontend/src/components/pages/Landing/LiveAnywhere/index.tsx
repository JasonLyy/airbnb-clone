import React from "react";
import House1 from "../../../../assets/house1.jpg";
import House2 from "../../../../assets/house2.jpg";
import House3 from "../../../../assets/house3.jpg";
import House4 from "../../../../assets/house4.jpg";

import styled from "styled-components";
import HouseCard from "./HouseCard";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LiveAnywhere: React.VFC = () => {
  return (
    <>
      <h1>Live Anywhere</h1>
      <Container>
        <HouseCard url={House1} title="Outdoor getaways" />
        <HouseCard url={House2} title="Unique stays" />
        <HouseCard url={House3} title="Entire homes" />
        <HouseCard url={House4} title="Pets allowed" />
      </Container>
    </>
  );
};

export default LiveAnywhere;
