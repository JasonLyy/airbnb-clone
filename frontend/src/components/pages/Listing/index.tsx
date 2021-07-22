import React from "react";
import styled from "styled-components";
import { useGetListingParam } from "./useGetListingParams";
import ViewPhotos from "./ViewPhotos";
import ListingHeader from "./ListingHeader";
import ReservationCheckout from "./ReservationCheckout";
import ReactHtmlParser from "react-html-parser";
import { useListingQuery } from "./__generated__/queries.generated";
import HorizontalDivider from "App/components/shared/HorizontalDivider";
import ListingCapcitySummary from "App/components/shared/ListingCapcitySummary";
import Loader from "App/components/shared/Loader";
import Footer from "App/components/shared/Footer";

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

const BodyDescription = styled.div`
  margin-right: 16px;
`;

const BodyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 16px;
`;

const AmenitiesList = styled.ul`
  columns: 2;
`;

const Listing: React.VFC = () => {
  const { listingId, infants, adults, children } = useGetListingParam();
  const guestsCount =
    parseInt(infants || "0", 10) +
    parseInt(adults || "0", 10) +
    parseInt(children || "0", 10);

  const { data, isLoading } = useListingQuery({
    id: parseInt(listingId, 10),
  });

  if (isLoading) {
    return <Loader />;
  }

  const {
    name,
    reviews,
    rating,
    neighbourhoodCleansed,
    neighbourhoodOverview,
    description,
    beds,
    bedrooms,
    bathrooms,
    amenities,
  } = data?.listing || {};

  return (
    <Container>
      <Header>Header</Header>
      <Body>
        <BodyContainer>
          <ListingHeader
            heading={name || "Listing"}
            reviews={reviews || 0}
            ratings={rating || 0}
            isSuperHost
            location={neighbourhoodCleansed || ""}
          />

          <ListingCapcitySummary
            guests={guestsCount}
            bedroom={bedrooms || 0}
            bathroom={bathrooms || 0}
            beds={beds || 0}
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
            <BodyDescription>
              <h1>About the place</h1>

              {ReactHtmlParser(description || "")}

              <HorizontalDivider />

              <h1>Neighbourhood Overview</h1>
              {ReactHtmlParser(neighbourhoodOverview || "")}

              <HorizontalDivider />

              <h1>Amenities</h1>

              <AmenitiesList>
                {amenities.map((a: string) => (
                  <li key={a}>{a}</li>
                ))}
              </AmenitiesList>
            </BodyDescription>
            <ReservationCheckout />
          </BodyInfo>
        </BodyContainer>
      </Body>
      <Footer />
    </Container>
  );
};

export default Listing;
