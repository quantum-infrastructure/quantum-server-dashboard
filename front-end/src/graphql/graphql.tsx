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
  Upload: { input: any; output: any; }
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  data?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FileType = {
  __typename?: 'FileType';
  key: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type FileTypeResponse = {
  __typename?: 'FileTypeResponse';
  data?: Maybe<FileType>;
  success: Scalars['Boolean']['output'];
};

export type Instance = {
  __typename?: 'Instance';
  groups?: Maybe<Array<Scalars['String']['output']>>;
  instanceId: Scalars['String']['output'];
  keyPair?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  vpc?: Maybe<Scalars['String']['output']>;
};

export type InstanceArrayResponse = {
  __typename?: 'InstanceArrayResponse';
  data?: Maybe<Array<Instance>>;
  success: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEc2: BooleanResponse;
  deleteInstance: BooleanResponse;
  login: SessionTypeResponse;
  uploadFile: FileTypeResponse;
};


export type MutationCreateEc2Args = {
  count: Scalars['Int']['input'];
};


export type MutationDeleteInstanceArgs = {
  instanceIds: Array<Scalars['String']['input']>;
  keyPairName: Scalars['String']['input'];
  vpcId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllIntstances: InstanceArrayResponse;
  getSession: SessionTypeResponse;
  hello: Scalars['String']['output'];
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

export type CreateEc2MutationVariables = Exact<{
  count: Scalars['Int']['input'];
}>;


export type CreateEc2Mutation = { __typename?: 'Mutation', createEc2: { __typename?: 'BooleanResponse', success: boolean } };

export type DeleteInstanceMutationVariables = Exact<{
  vpcId: Scalars['String']['input'];
  keyPairName: Scalars['String']['input'];
  instanceIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteInstanceMutation = { __typename?: 'Mutation', deleteInstance: { __typename?: 'BooleanResponse', success: boolean } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'FileTypeResponse', success: boolean, data?: { __typename?: 'FileType', key: string, path: string } | null } };

export type GetAllInstancesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInstancesQuery = { __typename?: 'Query', getAllIntstances: { __typename?: 'InstanceArrayResponse', success: boolean, totalCount?: number | null, data?: Array<{ __typename?: 'Instance', instanceId: string, name?: string | null, keyPair?: string | null, vpc?: string | null, groups?: Array<string> | null }> | null } };

export type GetSessionQueryVariables = Exact<{
  sessionToken: Scalars['String']['input'];
}>;


export type GetSessionQuery = { __typename?: 'Query', getSession: { __typename?: 'SessionTypeResponse', success: boolean, data?: { __typename?: 'Session', id?: string | null, sessionToken?: string | null, user?: { __typename?: 'User', email: string, id: string } | null } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SessionTypeResponse', success: boolean, data?: { __typename?: 'Session', sessionToken?: string | null, user?: { __typename?: 'User', email: string } | null } | null } };


export const CreateEc2Document = gql`
    mutation createEC2($count: Int!) {
  createEc2(count: $count) {
    success
  }
}
    `;
export type CreateEc2MutationFn = Apollo.MutationFunction<CreateEc2Mutation, CreateEc2MutationVariables>;

/**
 * __useCreateEc2Mutation__
 *
 * To run a mutation, you first call `useCreateEc2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEc2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEc2Mutation, { data, loading, error }] = useCreateEc2Mutation({
 *   variables: {
 *      count: // value for 'count'
 *   },
 * });
 */
export function useCreateEc2Mutation(baseOptions?: Apollo.MutationHookOptions<CreateEc2Mutation, CreateEc2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEc2Mutation, CreateEc2MutationVariables>(CreateEc2Document, options);
      }
export type CreateEc2MutationHookResult = ReturnType<typeof useCreateEc2Mutation>;
export type CreateEc2MutationResult = Apollo.MutationResult<CreateEc2Mutation>;
export type CreateEc2MutationOptions = Apollo.BaseMutationOptions<CreateEc2Mutation, CreateEc2MutationVariables>;
export const DeleteInstanceDocument = gql`
    mutation deleteInstance($vpcId: String!, $keyPairName: String!, $instanceIds: [String!]!) {
  deleteInstance(
    vpcId: $vpcId
    keyPairName: $keyPairName
    instanceIds: $instanceIds
  ) {
    success
  }
}
    `;
export type DeleteInstanceMutationFn = Apollo.MutationFunction<DeleteInstanceMutation, DeleteInstanceMutationVariables>;

/**
 * __useDeleteInstanceMutation__
 *
 * To run a mutation, you first call `useDeleteInstanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInstanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInstanceMutation, { data, loading, error }] = useDeleteInstanceMutation({
 *   variables: {
 *      vpcId: // value for 'vpcId'
 *      keyPairName: // value for 'keyPairName'
 *      instanceIds: // value for 'instanceIds'
 *   },
 * });
 */
export function useDeleteInstanceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInstanceMutation, DeleteInstanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInstanceMutation, DeleteInstanceMutationVariables>(DeleteInstanceDocument, options);
      }
export type DeleteInstanceMutationHookResult = ReturnType<typeof useDeleteInstanceMutation>;
export type DeleteInstanceMutationResult = Apollo.MutationResult<DeleteInstanceMutation>;
export type DeleteInstanceMutationOptions = Apollo.BaseMutationOptions<DeleteInstanceMutation, DeleteInstanceMutationVariables>;
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!) {
  uploadFile(file: $file) {
    success
    data {
      key
      path
    }
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const GetAllInstancesDocument = gql`
    query getAllInstances {
  getAllIntstances {
    success
    data {
      instanceId
      name
      keyPair
      vpc
      groups
    }
    totalCount
  }
}
    `;

/**
 * __useGetAllInstancesQuery__
 *
 * To run a query within a React component, call `useGetAllInstancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllInstancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllInstancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllInstancesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllInstancesQuery, GetAllInstancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllInstancesQuery, GetAllInstancesQueryVariables>(GetAllInstancesDocument, options);
      }
export function useGetAllInstancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllInstancesQuery, GetAllInstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllInstancesQuery, GetAllInstancesQueryVariables>(GetAllInstancesDocument, options);
        }
export function useGetAllInstancesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllInstancesQuery, GetAllInstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllInstancesQuery, GetAllInstancesQueryVariables>(GetAllInstancesDocument, options);
        }
export type GetAllInstancesQueryHookResult = ReturnType<typeof useGetAllInstancesQuery>;
export type GetAllInstancesLazyQueryHookResult = ReturnType<typeof useGetAllInstancesLazyQuery>;
export type GetAllInstancesSuspenseQueryHookResult = ReturnType<typeof useGetAllInstancesSuspenseQuery>;
export type GetAllInstancesQueryResult = Apollo.QueryResult<GetAllInstancesQuery, GetAllInstancesQueryVariables>;
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