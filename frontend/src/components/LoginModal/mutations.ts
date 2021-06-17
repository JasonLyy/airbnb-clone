import { gql } from "graphql-request";

const AUTH_PAYLOAD_FIELDS = gql`
  fragment AuthPayloadFields on AuthPayload {
    accessToken
    refreshToken
  }
`;

const CREATE_GUEST = gql`
  ${AUTH_PAYLOAD_FIELDS}

  mutation createGuest($input: CredentialsInput!) {
    createGuest(input: $input) {
      ...AuthPayloadFields
    }
  }
`;

const LOGIN_GUEST = gql`
  ${AUTH_PAYLOAD_FIELDS}

  mutation loginGuest($input: CredentialsInput!) {
    loginGuest(input: $input) {
      ...AuthPayloadFields
    }
  }
`;
