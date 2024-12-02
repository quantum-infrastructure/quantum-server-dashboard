import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  data?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type GameInstance = {
  __typename?: 'GameInstance';
  id: Scalars['String']['output'];
  state: Scalars['String']['output'];
  updated: Scalars['Float']['output'];
};

export type GameInstanceResponse = {
  __typename?: 'GameInstanceResponse';
  data: Array<GameInstance>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGameInstance: BooleanResponse;
  deleteGameInstance: Scalars['Boolean']['output'];
  generatePresignedUrl: Scalars['String']['output'];
  login: SessionTypeResponse;
};


export type MutationCreateGameInstanceArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteGameInstanceArgs = {
  gameInstanceId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllGameInstances: GameInstanceResponse;
  getGameInstance?: Maybe<GameInstance>;
  getSession: SessionTypeResponse;
};


export type QueryGetGameInstanceArgs = {
  gameInstanceId: Scalars['String']['input'];
};


export type QueryGetSessionArgs = {
  sessionToken: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  id?: Maybe<Scalars['String']['output']>;
  sessionToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type SessionTypeResponse = {
  __typename?: 'SessionTypeResponse';
  data?: Maybe<Session>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type CreateGameInstanceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CreateGameInstanceMutation = { __typename?: 'Mutation', createGameInstance: { __typename?: 'BooleanResponse', success: boolean } };

export type DeleteGameInstanceMutationVariables = Exact<{
  gameInstanceId: Scalars['String']['input'];
}>;


export type DeleteGameInstanceMutation = { __typename?: 'Mutation', deleteGameInstance: boolean };

export type GetAllGameInstancesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGameInstancesQuery = { __typename?: 'Query', getAllGameInstances: { __typename?: 'GameInstanceResponse', success: boolean, data: Array<{ __typename?: 'GameInstance', id: string, state: string, updated: number }> } };

export type GetGameInstanceQueryVariables = Exact<{
  gameInstanceId: Scalars['String']['input'];
}>;


export type GetGameInstanceQuery = { __typename?: 'Query', getGameInstance?: { __typename?: 'GameInstance', id: string, state: string, updated: number } | null };

export type GetSessionQueryVariables = Exact<{
  sessionToken: Scalars['String']['input'];
}>;


export type GetSessionQuery = { __typename?: 'Query', getSession: { __typename?: 'SessionTypeResponse', success: boolean, data?: { __typename?: 'Session', id?: string | null, sessionToken?: string | null, user?: { __typename?: 'User', email: string, id: string } | null } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SessionTypeResponse', success: boolean, data?: { __typename?: 'Session', sessionToken?: string | null, user?: { __typename?: 'User', email: string } | null } | null } };

export type GeneratePresignedUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type GeneratePresignedUrlMutation = { __typename?: 'Mutation', generatePresignedUrl: string };


export const CreateGameInstanceDocument = gql`
    mutation CreateGameInstance($id: String!) {
  createGameInstance(id: $id) {
    success
  }
}
    `;
export type CreateGameInstanceMutationFn = Apollo.MutationFunction<CreateGameInstanceMutation, CreateGameInstanceMutationVariables>;

/**
 * __useCreateGameInstanceMutation__
 *
 * To run a mutation, you first call `useCreateGameInstanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameInstanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameInstanceMutation, { data, loading, error }] = useCreateGameInstanceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateGameInstanceMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameInstanceMutation, CreateGameInstanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameInstanceMutation, CreateGameInstanceMutationVariables>(CreateGameInstanceDocument, options);
      }
export type CreateGameInstanceMutationHookResult = ReturnType<typeof useCreateGameInstanceMutation>;
export type CreateGameInstanceMutationResult = Apollo.MutationResult<CreateGameInstanceMutation>;
export type CreateGameInstanceMutationOptions = Apollo.BaseMutationOptions<CreateGameInstanceMutation, CreateGameInstanceMutationVariables>;
export const DeleteGameInstanceDocument = gql`
    mutation DeleteGameInstance($gameInstanceId: String!) {
  deleteGameInstance(gameInstanceId: $gameInstanceId)
}
    `;
export type DeleteGameInstanceMutationFn = Apollo.MutationFunction<DeleteGameInstanceMutation, DeleteGameInstanceMutationVariables>;

/**
 * __useDeleteGameInstanceMutation__
 *
 * To run a mutation, you first call `useDeleteGameInstanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGameInstanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGameInstanceMutation, { data, loading, error }] = useDeleteGameInstanceMutation({
 *   variables: {
 *      gameInstanceId: // value for 'gameInstanceId'
 *   },
 * });
 */
export function useDeleteGameInstanceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGameInstanceMutation, DeleteGameInstanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGameInstanceMutation, DeleteGameInstanceMutationVariables>(DeleteGameInstanceDocument, options);
      }
export type DeleteGameInstanceMutationHookResult = ReturnType<typeof useDeleteGameInstanceMutation>;
export type DeleteGameInstanceMutationResult = Apollo.MutationResult<DeleteGameInstanceMutation>;
export type DeleteGameInstanceMutationOptions = Apollo.BaseMutationOptions<DeleteGameInstanceMutation, DeleteGameInstanceMutationVariables>;
export const GetAllGameInstancesDocument = gql`
    query GetAllGameInstances {
  getAllGameInstances {
    success
    data {
      id
      state
      updated
    }
  }
}
    `;

/**
 * __useGetAllGameInstancesQuery__
 *
 * To run a query within a React component, call `useGetAllGameInstancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGameInstancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGameInstancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllGameInstancesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>(GetAllGameInstancesDocument, options);
      }
export function useGetAllGameInstancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>(GetAllGameInstancesDocument, options);
        }
export function useGetAllGameInstancesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>(GetAllGameInstancesDocument, options);
        }
export type GetAllGameInstancesQueryHookResult = ReturnType<typeof useGetAllGameInstancesQuery>;
export type GetAllGameInstancesLazyQueryHookResult = ReturnType<typeof useGetAllGameInstancesLazyQuery>;
export type GetAllGameInstancesSuspenseQueryHookResult = ReturnType<typeof useGetAllGameInstancesSuspenseQuery>;
export type GetAllGameInstancesQueryResult = Apollo.QueryResult<GetAllGameInstancesQuery, GetAllGameInstancesQueryVariables>;
export const GetGameInstanceDocument = gql`
    query GetGameInstance($gameInstanceId: String!) {
  getGameInstance(gameInstanceId: $gameInstanceId) {
    id
    state
    updated
  }
}
    `;

/**
 * __useGetGameInstanceQuery__
 *
 * To run a query within a React component, call `useGetGameInstanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameInstanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameInstanceQuery({
 *   variables: {
 *      gameInstanceId: // value for 'gameInstanceId'
 *   },
 * });
 */
export function useGetGameInstanceQuery(baseOptions: Apollo.QueryHookOptions<GetGameInstanceQuery, GetGameInstanceQueryVariables> & ({ variables: GetGameInstanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameInstanceQuery, GetGameInstanceQueryVariables>(GetGameInstanceDocument, options);
      }
export function useGetGameInstanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameInstanceQuery, GetGameInstanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameInstanceQuery, GetGameInstanceQueryVariables>(GetGameInstanceDocument, options);
        }
export function useGetGameInstanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGameInstanceQuery, GetGameInstanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameInstanceQuery, GetGameInstanceQueryVariables>(GetGameInstanceDocument, options);
        }
export type GetGameInstanceQueryHookResult = ReturnType<typeof useGetGameInstanceQuery>;
export type GetGameInstanceLazyQueryHookResult = ReturnType<typeof useGetGameInstanceLazyQuery>;
export type GetGameInstanceSuspenseQueryHookResult = ReturnType<typeof useGetGameInstanceSuspenseQuery>;
export type GetGameInstanceQueryResult = Apollo.QueryResult<GetGameInstanceQuery, GetGameInstanceQueryVariables>;
export const GetSessionDocument = gql`
    query GetSession($sessionToken: String!) {
  getSession(sessionToken: $sessionToken) {
    success
    data {
      id
      sessionToken
      user {
        email
        id
      }
    }
  }
}
    `;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *      sessionToken: // value for 'sessionToken'
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables> & ({ variables: GetSessionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
      }
export function useGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export function useGetSessionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionSuspenseQueryHookResult = ReturnType<typeof useGetSessionSuspenseQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    success
    data {
      sessionToken
      user {
        email
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GeneratePresignedUrlDocument = gql`
    mutation GeneratePresignedUrl {
  generatePresignedUrl
}
    `;
export type GeneratePresignedUrlMutationFn = Apollo.MutationFunction<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>;

/**
 * __useGeneratePresignedUrlMutation__
 *
 * To run a mutation, you first call `useGeneratePresignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePresignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePresignedUrlMutation, { data, loading, error }] = useGeneratePresignedUrlMutation({
 *   variables: {
 *   },
 * });
 */
export function useGeneratePresignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>(GeneratePresignedUrlDocument, options);
      }
export type GeneratePresignedUrlMutationHookResult = ReturnType<typeof useGeneratePresignedUrlMutation>;
export type GeneratePresignedUrlMutationResult = Apollo.MutationResult<GeneratePresignedUrlMutation>;
export type GeneratePresignedUrlMutationOptions = Apollo.BaseMutationOptions<GeneratePresignedUrlMutation, GeneratePresignedUrlMutationVariables>;