import React from "react";
import styled from "styled-components";
import Star from "../../../assets/review-star.svg";

const ReviewStar = styled.svg`
  width: 14px;
  height: 14px;
  color: ${(p) => p.theme.colors.primary};
`;

const Review = styled.div`
  display: block;
`;

const Rating = styled.span`
  font-weight: 600;
  margin-left: 4px;
`;

const ReviewCount = styled.span`
  margin-left: 4px;
  color: ${(p) => p.theme.colors.secondaryComponent};
  font-size: 14px;
`;

interface ReviewSummaryProps {
  reviews: number;
  ratings: number;
}
const ReviewSummary: React.VFC<ReviewSummaryProps> = ({ reviews, ratings }) => {
  return (
    <Review>
      <ReviewStar as={Star} />
      <Rating>{ratings.toFixed(2)}</Rating>
      <ReviewCount>({reviews} reviews)</ReviewCount>
    </Review>
  );
};

export default ReviewSummary;
