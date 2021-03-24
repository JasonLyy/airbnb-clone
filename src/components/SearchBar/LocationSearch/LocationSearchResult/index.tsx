import React from "react";
import styled from "styled-components";
import { SearchInput } from "../../types";
import CardItem from "./CardItem";
import PreviousSearchIconImage from "../../../../assets/recent-search-icon.svg";
import NearbyDestinationImage from "../../../../assets/map-icon.png";

const SearchResultPreview = styled.div`
  position: absolute;
  width: 517px;
  max-height: calc(100vh - 220px);
  left: 0px;
  top: 100%;
  overflow-y: auto;
  background-color: ${(p) => p.theme.colors.primaryBackground};
  border-radius: 32px;
  margin-top: 12px;
  padding: 32px 0px;
`;

const RecentSearchesDivider = styled.div`
  padding: 12px 0px 4px 24px;
`;

const NearbySearchIcon = styled.img`
  content: url(${NearbyDestinationImage});
  width: 48px;
  height: 48px;
`;

const PreviousSearchIcon = styled(PreviousSearchIconImage)`
  height: 24px;
  margin: auto;
`;

type LocationSearchProps = {
  inputText: SearchInput;
  isVisible: boolean;
};

const LocationSearch: React.FC<LocationSearchProps> = ({
  inputText,
  isVisible,
}) => {
  // console.log("Used later: ", inputText);
  return (
    <>
      {isVisible && (
        <SearchResultPreview>
          <CardItem
            cardIcon={<NearbySearchIcon />}
            cardText="Nearby Destinations"
            disableBorder
          />
          <RecentSearchesDivider>Recent Searches</RecentSearchesDivider>
          <CardItem
            cardIcon={<PreviousSearchIcon />}
            cardText="Apollo Bay (Placeholder)"
          />
          <CardItem
            cardIcon={<PreviousSearchIcon />}
            cardText="Apollo Bay (Placeholder)"
          />
          <CardItem
            cardIcon={<PreviousSearchIcon />}
            cardText="Apollo Bay (Placeholder)"
          />
          <CardItem
            cardIcon={<PreviousSearchIcon />}
            cardText="Apollo Bay (Placeholder)"
          />
          <CardItem
            cardIcon={<PreviousSearchIcon />}
            cardText="Apollo Bay (Placeholder)"
          />
        </SearchResultPreview>
      )}
    </>
  );
};

export default LocationSearch;
