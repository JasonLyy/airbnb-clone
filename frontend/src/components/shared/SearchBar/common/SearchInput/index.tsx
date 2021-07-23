import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  padding: 15px 32px;

  &:hover {
    cursor: pointer;
  }
`;

const InputHeading = styled.div`
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
`;

interface SearchInputProps {
  title: string;
  placeholder: string;
  onFocus?: (hovered: boolean) => void;
  onTextChange?: (text: string) => void;
  text?: string;
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  placeholder,
  onFocus,
  onTextChange,
  text,
  disabled = false,
  children,
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  const onInputFocusChanged = (focus: boolean) => {
    onFocus?.(focus);
    setInputFocused(focus);
  };

  return (
    <div onClick={() => setInputFocused(true)}>
      <InputContainer>
        <InputHeading>{title}</InputHeading>
        <Input
          placeholder={placeholder}
          ref={(input) => inputFocused && input?.focus()}
          onBlur={() => onInputFocusChanged(false)}
          onFocus={() => onInputFocusChanged(true)}
          onChange={(input) => onTextChange && onTextChange(input.target.value)}
          disabled={disabled}
          value={text}
        />
      </InputContainer>
      {children}
    </div>
  );
};

export default SearchInput;
