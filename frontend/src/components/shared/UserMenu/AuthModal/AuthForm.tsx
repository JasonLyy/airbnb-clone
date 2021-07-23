import React, { useState } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Close from "@material-ui/icons/Close";
import HorizontalDivider from "../../HorizontalDivider";
import AuthTabs from "./AuthTabs";
import {
  useCreateGuestMutation,
  useLoginGuestMutation,
} from "./__generated__/mutations.generated";
import { SelectedAuth } from "./const";
import ClearableTextField from "App/components/shared/ClearableTextField";

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

interface AuthFormProps {
  onCloseClick: () => void;
  selectedAuth: SelectedAuth;
}

const AuthForm: React.FC<AuthFormProps> = ({ onCloseClick, selectedAuth }) => {
  const {
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<LoginInputs>();

  const [selectedAuthTab, setSelectedAuth] = useState<SelectedAuth>(
    selectedAuth
  );
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
    switch (selectedAuthTab) {
      case SelectedAuth.SIGNUP:
        createGuest({
          input: {
            email: data.email,
            password: data.password,
          },
        });
        break;
      case SelectedAuth.SIGNIN:
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
        <AuthTabs
          selectedAuth={selectedAuthTab}
          onChange={(_, newAuthState: SelectedAuth) => {
            setSelectedAuth(newAuthState);
          }}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "You must specify an email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
          render={({ field }) => (
            <ClearableTextField
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              inputRef={field.ref}
              onChange={field.onChange}
              onClear={() => setValue("email", "")}
              showClearButton
              value={field.value || ""}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "You must specify a pasword",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          }}
          render={({ field }) => (
            <ClearableTextField
              label="Password"
              variant="outlined"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              inputRef={field.ref}
              onChange={field.onChange}
              onClear={() => setValue("password", "")}
              showClearButton
              value={field.value || ""}
            />
          )}
        />

        <Submit type="submit" value="Continue" />
      </Form>
    </Container>
  );
};

export default AuthForm;
