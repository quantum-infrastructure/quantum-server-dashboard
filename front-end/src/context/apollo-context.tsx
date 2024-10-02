"use client";
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// import { AuthenticationContext } from "@/components/context/authentication-context";
import { toast } from "react-toastify";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { ApiLookUpContext } from "./api-look-up-context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      toast(message);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // Handle network error (e.g., notify the user)
  }
});

interface ApolloContextProviderProps {
  children: ReactNode;
}

interface ApolloContext {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  setAuthToken: (token?: string) => void
  authToken?: string;
}


export const ApolloContext = createContext<ApolloContext>({
  setAuthToken: () => { throw "not initialized yet!" },
  authToken: ''
});

function ApolloContextProvider({
  children,
}: ApolloContextProviderProps): JSX.Element {

  const [authToken, setAuthTokenState] = useState<string | undefined>("");
  const setAuthToken = useCallback((token?: string) => {
    setAuthTokenState(token);
  }, [])

  const { graphUrl } = ApiLookUpContext();


  console.log(graphUrl,"UUUUURLLLLL")

  const apolloClient = useMemo(() => {
    const uploadLink = createUploadLink({
      // uri: graphUrl,
      uri: process.env.REACT_APP_GRAPH_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const appLink = from([errorLink, uploadLink]);
    return new ApolloClient({
      link: appLink,
      cache: new InMemoryCache(),
    });
  }, [authToken]);

  

  return (
    <ApolloContext.Provider
      value={{
        authToken,
        apolloClient,
        setAuthToken
      }}
    >
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
}

export default ApolloContextProvider;
