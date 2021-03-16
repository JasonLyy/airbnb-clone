import React from "react";
import styled, { css } from "styled-components";

const Item = styled.div`
  border-radius: 32px;
  flex: 1;

  ${(p: Partial<SearchItemProps>) => {
    if (p.selected === null) {
      return css`
        background-color: ${(p) => p.theme.colors.primaryBackground};
        :hover {
          background-color: ${(p) => p.theme.colors.secondaryBackground};
        }
      `;
    }

    return p.selected
      ? css`
          background-color: ${(p) => p.theme.colors.primaryBackground};
          box-shadow: rgb(0 0 0 / 5%) 0px 6px 20px;
        `
      : css`
          background-color: #f7f7f7; /** todo: use theme background color */
          :hover {
            background-color: ${(p) => p.theme.colors.secondaryBackground};
          }
        `;
  }}
`;

interface SearchItemProps {
  onClick?: () => void;
  selected: boolean | null;
}

const SearchItem: React.FC<SearchItemProps> = ({
  children,
  onClick,
  selected,
}) => {
  return (
    <Item selected={selected} onClick={onClick}>
      {children}
    </Item>
  );
};

export default SearchItem;
