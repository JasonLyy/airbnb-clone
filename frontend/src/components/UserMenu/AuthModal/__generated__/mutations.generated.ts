import * as Types from '../../../../types/types.generated';

import { useMutation, UseMutationOptions } from 'react-query';
import { fetchData } from 'App/fetcher';
export type AuthPayloadFieldsFragment = (
  { __typename?: 'AuthPayload' }
  & Pick<Types.AuthPayload, 'accessToken' | 'refreshToken'>
);

export type CreateGuestMutationVariables = Types.Exact<{
  input: Types.CredentialsInput;
}>;


export type CreateGuestMutation = (
  { __typename?: 'Mutation' }
  & { createGuest: (
    { __typename?: 'AuthPayload' }
    & AuthPayloadFieldsFragment
  ) }
);

export type LoginGuestMutationVariables = Types.Exact<{
  input: Types.CredentialsInput;
}>;


export type LoginGuestMutation = (
  { __typename?: 'Mutation' }
  & { loginGuest: (
    { __typename?: 'AuthPayload' }
    & AuthPayloadFieldsFragment
  ) }
);

export const AuthPayloadFieldsFragmentDoc = `
    fragment AuthPayloadFields on AuthPayload {
  accessToken
  refreshToken
}
    `;
export const CreateGuestDocument = `
    mutation createGuest($input: CredentialsInput!) {
  createGuest(input: $input) {
    ...AuthPayloadFields
  }
}
    ${AuthPayloadFieldsFragmentDoc}`;
export const useCreateGuestMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateGuestMutation, TError, CreateGuestMutationVariables, TContext>) => 
    useMutation<CreateGuestMutation, TError, CreateGuestMutationVariables, TContext>(
      (variables?: CreateGuestMutationVariables) => fetchData<CreateGuestMutation, CreateGuestMutationVariables>(CreateGuestDocument, variables)(),
      options
    );
export const LoginGuestDocument = `
    mutation loginGuest($input: CredentialsInput!) {
  loginGuest(input: $input) {
    ...AuthPayloadFields
  }
}
    ${AuthPayloadFieldsFragmentDoc}`;
export const useLoginGuestMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginGuestMutation, TError, LoginGuestMutationVariables, TContext>) => 
    useMutation<LoginGuestMutation, TError, LoginGuestMutationVariables, TContext>(
      (variables?: LoginGuestMutationVariables) => fetchData<LoginGuestMutation, LoginGuestMutationVariables>(LoginGuestDocument, variables)(),
      options
    );