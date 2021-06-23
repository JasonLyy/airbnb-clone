import React, { useState } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import HorizontalDivider from "../pages/SearchHomes/Results/ListingCard/HorizontalDivider";
import LoginTabs, { TabState } from "./LoginTabs";
import {
  useCreateGuestMutation,
  useLoginGuestMutation,
} from "./__generated__/mutations.generated";

const Container = styled.div`
  width: 100%;
  max-width: 568px;
  border-radius: 12px;
  background-color: ${(p) => p.theme.colors.primaryBackground};

  position: relative;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
`;

const Header = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  padding-left: 24px;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 4px;
`;

const CloseIcon = styled(Close)`
  &&& {
    position: relative;
    display: block;
    margin: auto;
    width: 16px;
    height: 16px;

    color: ${(p) => p.theme.colors.primaryComponent};
  }
`;

const CloseButton = styled.button`
  outline: none;
  border: 0;
  background: none;

  width: 32px;
  height: 32px;
  border-radius: 16px;

  &:hover {
    background-color: ${(p) => p.theme.colors.secondaryBackground};
    cursor: pointer;
  }
`;

const HeaderText = styled.div`
  color: ${(p) => p.theme.colors.primaryComponent};
  margin: auto;
  font-size: 24px;
  font-weight: 800;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const FormHeader = styled.h2`
  margin: 0px;
`;

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

const Submit = styled.input`
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  padding: 14px 24px;
  border-radius: 12px;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primaryTitleText};
  font-weight: 600;
  font-size: 16px;
  border: none;
`;

type LoginInputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onCloseClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onCloseClick }) => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const [tabState, setTabState] = useState<TabState>(TabState.SIGNUP);
  const { mutate: createGuest } = useCreateGuestMutation({
    onSuccess: () => window.location.reload(),
    onError: () => {
      setError("email", {
        type: "manual",
        message: "Duplicate email address?",
      });
    },
  });
  const { mutate: loginGuest } = useLoginGuestMutation({
    onSuccess: () => window.location.reload(),
    onError: () => {
      setError("email", {
        type: "manual",
        message: "Invalid email or password?",
      });
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    switch (tabState) {
      case TabState.SIGNUP:
        createGuest({
          input: {
            email: data.email,
            password: data.password,
          },
        });
        break;
      case TabState.SIGNIN:
        loginGuest({
          input: {
            email: data.email,
            password: data.password,
          },
        });
        break;
    }
  };

  return (
    <Container>
      <Header>
        <CloseButton onClick={onCloseClick}>
          <CloseIcon />
        </CloseButton>
        <HeaderText>Log in or sign up</HeaderText>
      </Header>

      <HorizontalDivider />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>Welcome to Airbnb</FormHeader>
        <LoginTabs
          tabState={tabState}
          onChange={(_, newTabState: TabState) => setTabState(newTabState)}
        />

        <Input
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "You must specify an email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <Input
          label="Password"
          variant="outlined"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "You must specify a pasword",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />

        <Submit type="submit" value="Continue" />
      </Form>
    </Container>
  );
};

export default LoginForm;
