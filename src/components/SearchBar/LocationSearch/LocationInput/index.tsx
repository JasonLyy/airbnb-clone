import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px 32px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
`;

interface LocationInputProps {
  onFocus?: (hovered: boolean) => void;
  onTextChange: (text: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  onFocus,
  onTextChange,
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  const onInputFocusChanged = (focus: boolean) => {
    onFocus?.(focus);
    setInputFocused(focus);
  };

  return (
    <Container onClick={() => setInputFocused(true)}>
      <div>
        <strong>Location</strong>
      </div>
      <Input
        placeholder="Where are you going?"
        ref={(input) => inputFocused && input?.focus()}
        onBlur={() => onInputFocusChanged(false)}
        onFocus={() => onInputFocusChanged(true)}
        onChange={(input) => onTextChange(input.target.value)}
      />
    </Container>
  );
};

export default LocationInput;
