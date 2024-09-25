import {
  User,
  useGetSessionQuery,
} from "../graphql/graphql";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Cookies from "universal-cookie";
const TOKEN_NAME = "QS_FRONTEND_NAME";

export enum SessionCheckStatus {
  NOT_CHECKED = "NOT_CHECKED",
  CHECKED = "CHECKED",
  CHECKING = "CHECKING",
}
export type UseSessionCheckProps = {
  setAuthToken: (token?: string | undefined) => void;
  authToken: string | undefined;
};

export type UseSessionCheckResult = {
  user: User | null;
  sessionCheckStatus: SessionCheckStatus;
  logout: () => void;
};

export const useSessionCheck = ({
  authToken,
  setAuthToken,
}: UseSessionCheckProps): UseSessionCheckResult => {
  const cookies: Cookies = useMemo(() => new Cookies(null, { path: "/" }), []);

  const [state, setState] = useState<{
    user: User | null;
    sessionCheckStatus: SessionCheckStatus;
  }>({
    user: null,
    sessionCheckStatus: SessionCheckStatus.NOT_CHECKED,
  });

  const getSession = useGetSessionQuery({
    variables: {
      sessionToken: authToken || "",
    },
    skip: !authToken,
  });

  //   // initial
  useEffect(() => {
    const savedToken = cookies.get(TOKEN_NAME);
    setAuthToken(savedToken);
  }, []);

  // after get session
  useEffect(() => {
    if (state.sessionCheckStatus == SessionCheckStatus.NOT_CHECKED) {
      setState({
        ...state,
        sessionCheckStatus: SessionCheckStatus.CHECKED
      })
      return;
    }
    cookies.set(
      TOKEN_NAME,
      getSession.data?.getSession.data?.sessionToken || ""
    );
    setAuthToken(getSession.data?.getSession.data?.sessionToken || undefined);
    setState({
      user: getSession.data?.getSession.data?.user || null,
      sessionCheckStatus: SessionCheckStatus.CHECKED,
    });
  }, [getSession.data?.getSession.data?.sessionToken]);

  // on session loading
  useEffect(() => {
    console.log(" on session loading", getSession.loading);
    if (getSession.loading) {
      setState({
        ...state,
        sessionCheckStatus: SessionCheckStatus.CHECKED,
      });
    }
  });

  const logout = useCallback(() => {
    cookies.remove(TOKEN_NAME);
    setState({
      ...state, 
      user: null,
    })
    setAuthToken("");
  }, []);

  return { ...state, logout };
};
