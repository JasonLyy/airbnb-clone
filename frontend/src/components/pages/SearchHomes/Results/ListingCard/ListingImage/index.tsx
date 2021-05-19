import React from "react";
import styled from "styled-components";

const Image = styled.div<ListingImageProps>`
  background: url(${(p) => p.url});
  width: 300px;
  max-height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 16px;
`;

interface ListingImageProps {
  url: string;
}
const ListingImage: React.FC<ListingImageProps> = ({ url }) => {
  return <Image url={url} />;
};

export default ListingImage;
