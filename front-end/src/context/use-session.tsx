// import {
//   User,
//   useGetSessionQuery,
// } from "../graphql/graphql";
// import {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
// } from "react";
// import Cookies from "universal-cookie";
// const TOKEN_NAME = "QS_FRONTEND_NAME";

// export enum SessionCheckStatus {
//   NOT_CHECKED = "NOT_CHECKED",
//   CHECKED = "CHECKED",
//   CHECKING = "CHECKING",
// }
// export type UseSessionCheckProps = {
//   setAuthToken: (token?: string | undefined) => void;
//   authToken: string | undefined;
// };

// export type UseSessionCheckResult = {
//   user: User | null;
//   sessionCheckStatus: SessionCheckStatus;
//   logout: () => void;
// };

// export const useSessionCheck = ({
//   authToken,
//   setAuthToken,
// }: UseSessionCheckProps): UseSessionCheckResult => {
//   const cookies: Cookies = useMemo(() => new Cookies(null, { path: "/" }), []);

//   const [state, setState] = useState<{
//     user: User | null;
//     sessionCheckStatus: SessionCheckStatus;
//   }>({
//     user: null,
//     sessionCheckStatus: SessionCheckStatus.NOT_CHECKED,
//   });

//   const getSession = useGetSessionQuery({
//     variables: {
//       sessionToken: authToken || "",
//     },
//     skip: !authToken,
//   });

//   //   // initial
//   useEffect(() => {
//     const savedToken = cookies.get(TOKEN_NAME);
//     setAuthToken(savedToken);
//   }, []);

//   // after get session
//   useEffect(() => {
//     if (state.sessionCheckStatus == SessionCheckStatus.NOT_CHECKED) {
//       setState({
//         ...state,
//         sessionCheckStatus: SessionCheckStatus.CHECKED
//       })
//       return;
//     }
//     cookies.set(
//       TOKEN_NAME,
//       getSession.data?.getSession.data?.sessionToken || ""
//     );
//     setAuthToken(getSession.data?.getSession.data?.sessionToken || undefined);
//     setState({
//       user: getSession.data?.getSession.data?.user || null,
//       sessionCheckStatus: SessionCheckStatus.CHECKED,
//     });
//   }, [getSession.data?.getSession.data?.sessionToken]);

//   // on session loading
//   useEffect(() => {
//     if (getSession.loading) {
//       setState({
//         ...state,
//         sessionCheckStatus: SessionCheckStatus.CHECKED,
//       });
//     }
//   });

//   const logout = useCallback(() => {
//     cookies.remove(TOKEN_NAME);
//     setState({
//       ...state, 
//       user: null,
//     })
//     setAuthToken("");
//   }, []);

//   return { ...state, logout };
// };





// // mutation uploadFile($file: Upload!) {
// // 	uploadFile(file: $file) {
// // 		success
		
// // 		data {
// // 			key
// // 			path
// // 		}
// // 	}
// // }




import { User, useGetSessionQuery } from "../graphql/graphql";
import { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "universal-cookie";
const TOKEN_NAME = "QS_FRONTEND_NAME";

export enum SessionCheckStatus {
  NOT_CHECKED = "NOT_CHECKED",
  CHECKING = "CHECKING",
  CHECKED = "CHECKED",
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
  useEffect(() => {
    console.log(state.sessionCheckStatus, "ASDASDASD")
  })
  
  const {data, called, loading} = useGetSessionQuery({
    variables: {
      sessionToken: authToken || "",
    },
    skip: !authToken,
  });

  //   // initial
  useEffect(() => {
    console.log(11111)
    const savedToken = cookies.get(TOKEN_NAME);
    if (savedToken) {
      setState({
        ...state,
        sessionCheckStatus: SessionCheckStatus.CHECKING,
      });
    }else{
      setState({
        ...state,
        user: null,
        sessionCheckStatus: SessionCheckStatus.CHECKED,
      });
    }

    setAuthToken(savedToken);
  }, []);

  // after get session
  useEffect(() => {
    console.log(222222)

    if(!called){
      return;
    }

    if (state.sessionCheckStatus == SessionCheckStatus.NOT_CHECKED) {
      console.log("SAVE TOKEN");
      console.log(333333)

      setState({
        ...state,
        sessionCheckStatus: SessionCheckStatus.CHECKED,
      });
      return;
    }
    cookies.set(
      TOKEN_NAME,
      data?.getSession.data?.sessionToken || ""
    );
    setState({
      user: data?.getSession.data?.user || null,
      sessionCheckStatus: SessionCheckStatus.CHECKED,
    });
  }, [data?.getSession.data?.sessionToken, called]);

  useEffect(() => {
          console.log(state.sessionCheckStatus,444444)


    if (state.sessionCheckStatus === SessionCheckStatus.CHECKED){
      setAuthToken(data?.getSession.data?.sessionToken || undefined);

    }
    // console.log(state.sessionCheckStatus,"BABAIAGA")
      // setAuthToken(data?.getSession.data?.sessionToken || undefined);
  }, [state.sessionCheckStatus]);


  // on session loading
  useEffect(() => {
    
    if (loading) {
      console.log(555555)

      setState({
        ...state,
        sessionCheckStatus: SessionCheckStatus.CHECKING,
      });
    }
  }, [loading]);

  const logout = useCallback(() => {
    cookies.remove(TOKEN_NAME);
    setState({
      ...state,
      user: null,
      sessionCheckStatus : SessionCheckStatus.CHECKED
    });
    setAuthToken("");
    console.log(state.sessionCheckStatus,"LOGOUT SESSION STATUS")
  }, []);

  return { ...state, logout };
};
