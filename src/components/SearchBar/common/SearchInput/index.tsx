import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px 32px;
`;

const InputHeading = styled.div`
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
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
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  const onInputFocusChanged = (focus: boolean) => {
    onFocus?.(focus);
    setInputFocused(focus);
  };

  return (
    <Container onClick={() => setInputFocused(true)}>
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
    </Container>
  );
};

export default SearchInput;
