import React from "react";
import styled from "styled-components";
import { useGetListingParam } from "./useGetListingParams";
import ViewPhotos from "./ViewPhotos";
import ListingHeader from "./ListingHeader";
import ReservationCheckout from "./ReservationCheckout";

const Container = styled.div`
  background-color: white;
`;

const Header = styled.div`
  background-color: ${(p) => p.theme.colors.primaryBackground};
  height: 80px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 12px;
`;

const Body = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  justify-content: center;
`;

const BodyContainer = styled.div`
  display: relative;
  width: 60%;
`;

const BodyInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Footer = styled.div`
  background-color: black;
  height: 550px;
`;

interface ListingProps {
  photosUrl: string[];
}
const Listing: React.VFC = () => {
  const x = useGetListingParam();
  console.log(x);

  return (
    <Container>
      <Header>Header</Header>
      <Body>
        <BodyContainer>
          <ListingHeader
            heading="Hideout Cabin - Luxury Tiny Home"
            reviews={5}
            ratings={5}
            isSuperHost
            location="Melbourne, Victoria, Australia"
          />
          <ViewPhotos
            photosUrl={[
              "https://a0.muscache.com/im/pictures/f923b294-8b45-4a18-be06-485ee401b400.jpg?im_w=1200",
              "https://a0.muscache.com/im/pictures/495adc30-7edb-4248-91f5-96350f9db333.jpg?im_w=1440",
              "https://a0.muscache.com/im/pictures/44da7787-ae9a-409b-85cf-408bf480ab9a.jpg?im_w=1440",
              "https://a0.muscache.com/im/pictures/26d8b8af-36b0-42e7-91c4-6dc8da94f71c.jpg?im_w=1440",
              "https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440",
            ]}
          />

          <BodyInfo>
            <div>
              https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440
              https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440
              https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440
              https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440
              https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440
              https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440https://a0.muscache.com/im/pictures/cd1a7261-def7-4055-b85a-d8c053b3ab8f.jpg?im_w=1440
            </div>
            <ReservationCheckout />
          </BodyInfo>
        </BodyContainer>
      </Body>
      <Footer>Footer</Footer>
    </Container>
  );
};

export default Listing;
