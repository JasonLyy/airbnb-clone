import { gql } from "graphql-request";

const LOGOUT_PAYLOAD_FIELDS = gql`
  fragment LogoutPayloadFields on LogoutPayload {
    success
  }
`;

gql`
  ${LOGOUT_PAYLOAD_FIELDS}

  mutation logoutGuest {
    logoutGuest {
      ...LogoutPayloadFields
    }
  }
`;
