import React from "react";
import styled from "styled-components";

interface PhotoProps {
  url: string;
}
const PhotoPrimary = styled.div<PhotoProps>`
  background: url(${(p) => p.url});
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  grid-row-end: span 2;
  grid-column-end: span 2;
  border-radius: 16px;
`;
const PhotoSecondary = styled.div<PhotoProps>`
  background: url(${(p) => p.url});
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  grid-row-end: span 1;
  grid-column-end: span 1;
  border-radius: 16px;
`;

const ViewPhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 282px 282px;
  grid-gap: 8px;
`;

interface ViewPhotosProps {
  photosUrl: string[];
  hasPrimaryPhoto?: boolean;
}
const ViewPhotos: React.VFC<ViewPhotosProps> = ({ photosUrl }) => {
  const photos = photosUrl.map((url, index) => {
    return index === 0 ? (
      <PhotoPrimary url={url} key={url} />
    ) : (
      <PhotoSecondary url={url} key={url} />
    );
  });

  return <ViewPhotosGrid>{photos}</ViewPhotosGrid>;
};

export default ViewPhotos;
