// import {
//   Exact,
//   GetSessionDocument,
//   GetSessionQuery,
//   GetSessionQueryVariables,
//   LoginMutation,
//   LoginMutationHookResult,
//   LoginMutationOptions,
//   User,
//   useGetSessionQuery,
//   useLoginMutation,
// } from "../graphql/graphql";
// import {
//   ApolloCache,
//   DefaultContext,
//   FetchResult,
//   MutationFunctionOptions,
//   MutationResult,
//   useMutation,
//   useQuery,
// } from "@apollo/client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
//   useMemo,
// } from "react";
// import { ApolloContext } from "./apollo-context";
// import Cookies from "universal-cookie";
// import { SessionCheckStatus, useSessionCheck } from "./use-session";

// interface AuthContextType {
//   user: User | null;
//   login: (
//     options?:
//       | MutationFunctionOptions<
//           LoginMutation,
//           Exact<{
//             email: string;
//             password: string;
//           }>,
//           DefaultContext,
//           ApolloCache<any>
//         >
//       | undefined
//   ) => Promise<FetchResult<LoginMutation>>;
//   loginResult: MutationResult<LoginMutation>;
//   sessionCheckStatus: SessionCheckStatus;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType>({
//   sessionCheckStatus: SessionCheckStatus.NOT_CHECKED,
// } as any);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const { setAuthToken, authToken } = useContext(ApolloContext);

//   const [loginMutation, loginResult] = useLoginMutation();

//   const { sessionCheckStatus, user, logout } = useSessionCheck({
//     authToken,
//     setAuthToken,
//   });

//   useEffect(() => {
//     if (loginResult.data?.login.data?.sessionToken) {
//       const token = loginResult.data?.login.data?.sessionToken || undefined;
//       setAuthToken(token);
//     }
//   }, [loginResult.data?.login.data?.sessionToken]);

//   return (
//     <AuthContext.Provider
//       value={{ user, login: loginMutation, loginResult, sessionCheckStatus, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };








import {
  User,
  Exact,
  LoginMutation,
  useLoginMutation,
} from "../graphql/graphql";
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  MutationResult,
} from "@apollo/client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { ApolloContext } from "./apollo-context";
import Cookies from "universal-cookie";
import { SessionCheckStatus, useSessionCheck } from "./use-session";

interface AuthContextType {
  user: User | null;
  login: (
    options?:
      | MutationFunctionOptions<
          LoginMutation,
          Exact<{
            email: string;
            password: string;
          }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<FetchResult<LoginMutation>>;
  loginResult: MutationResult<LoginMutation>;
  sessionCheckStatus: SessionCheckStatus;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  sessionCheckStatus: SessionCheckStatus.NOT_CHECKED,
} as any);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthToken, authToken } = useContext(ApolloContext);

  const [loginMutation, loginResult] = useLoginMutation();

  const { sessionCheckStatus, user, logout } = useSessionCheck({
    authToken,
    setAuthToken,
  });

  useEffect(() => {
    if (loginResult.data?.login.data?.sessionToken) {
      const token = loginResult.data?.login.data?.sessionToken || undefined;
      setAuthToken(token);
    }
  }, [loginResult.data?.login.data?.sessionToken]);




  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation,
        loginResult,
        sessionCheckStatus,
        logout,
      }}
    >
      {/* {sessionCheckStatus == SessionCheckStatus.CHECKED?children:"Loading"} */}
      {children}
    </AuthContext.Provider>
  );
};
