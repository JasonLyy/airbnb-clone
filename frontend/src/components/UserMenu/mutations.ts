import { gql } from "graphql-request";

const LOGOUT_PAYLOAD_FIELDS = gql`
  fragment LogoutPayloadFields on LogoutPayload {
    success
  }
`;

const LOGOUT_GUEST = gql`
  ${LOGOUT_PAYLOAD_FIELDS}

  mutation logoutGuest {
    logoutGuest {
      ...LogoutPayloadFields
    }
  }
`;
