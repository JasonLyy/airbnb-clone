import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import styled from "styled-components";

const Input = styled(TextField)`
  &&& {
    margin-top: 10px;
    font-family: inherit;

    .Mui-focused fieldset {
      border-color: ${(p) => p.theme.colors.primaryComponent};
    }

    & label.Mui-focused {
      color: ${(p) => p.theme.colors.secondaryComponent};
    }
  }
`;
type ClearableTextFieldProps = TextFieldProps & {
  onClear: () => void;
};

const ClearableTextField: React.FC<ClearableTextFieldProps> = ({
  onClear,
  ...props
}) => {
  return (
    <Input
      {...props}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onClear}>
            <CancelRoundedIcon />
          </IconButton>
        ),
      }}
      // value={value}
    />
  );
};

export default ClearableTextField;
