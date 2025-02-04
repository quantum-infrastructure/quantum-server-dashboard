import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authentication-context";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { user ,sessionCheckStatus} = useContext(AuthContext);
    if (sessionCheckStatus === "NOT_CHECKED" || sessionCheckStatus === "CHECKING") {
      return <div>Loading...</div>;
    }
    console.log("CHECKED HERE!", user, sessionCheckStatus)
    return user ? <Component {...props} /> : <Navigate to="/login" replace />;
  };
};

export default withAuth;
