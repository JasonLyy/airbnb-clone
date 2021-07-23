import * as Types from '../../../../types/types.generated';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetchData } from 'App/fetcher';
export type LogoutPayloadFieldsFragment = (
  { __typename?: 'LogoutPayload' }
  & Pick<Types.LogoutPayload, 'success'>
);

export type LogoutGuestMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogoutGuestMutation = (
  { __typename?: 'Mutation' }
  & { logoutGuest: (
    { __typename?: 'LogoutPayload' }
    & LogoutPayloadFieldsFragment
  ) }
);

export const LogoutPayloadFieldsFragmentDoc = `
    fragment LogoutPayloadFields on LogoutPayload {
  success
}
    `;
export const LogoutGuestDocument = `
    mutation logoutGuest {
  logoutGuest {
    ...LogoutPayloadFields
  }
}
    ${LogoutPayloadFieldsFragmentDoc}`;
export const useLogoutGuestMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LogoutGuestMutation, TError, LogoutGuestMutationVariables, TContext>) => 
    useMutation<LogoutGuestMutation, TError, LogoutGuestMutationVariables, TContext>(
      (variables?: LogoutGuestMutationVariables) => fetchData<LogoutGuestMutation, LogoutGuestMutationVariables>(LogoutGuestDocument, variables)(),
      options
    );