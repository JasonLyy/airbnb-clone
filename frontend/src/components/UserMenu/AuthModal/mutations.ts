import { gql } from "graphql-request";

const AUTH_PAYLOAD_FIELDS = gql`
  fragment AuthPayloadFields on AuthPayload {
    accessToken
    refreshToken
  }
`;

gql`
  ${AUTH_PAYLOAD_FIELDS}

  mutation createGuest($input: CredentialsInput!) {
    createGuest(input: $input) {
      ...AuthPayloadFields
    }
  }
`;

gql`
  ${AUTH_PAYLOAD_FIELDS}

  mutation loginGuest($input: CredentialsInput!) {
    loginGuest(input: $input) {
      ...AuthPayloadFields
    }
  }
`;
