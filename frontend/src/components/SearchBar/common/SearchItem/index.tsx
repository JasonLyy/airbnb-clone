import React from "react";
import styled, { css } from "styled-components";

const Item = styled.div<Partial<SearchItemProps>>`
  overflow: hidden;
  border-radius: 32px;
  flex: ${(p) => p.flexGrow} 0 0;

  ${(p) => {
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
          background-color: ${(p) => p.theme.colors.lighterPrimaryBackground};
          :hover {
            background-color: ${(p) => p.theme.colors.secondaryBackground};
          }
        `;
  }}
`;

interface SearchItemProps {
  onClick?: () => void;
  selected: boolean | null;
  flexGrow?: number;
}

const SearchItem: React.FC<SearchItemProps> = ({
  children,
  onClick,
  selected,
  flexGrow = 1,
}) => {
  return (
    <Item selected={selected} onClick={onClick} flexGrow={flexGrow}>
      {children}
    </Item>
  );
};

export default SearchItem;
