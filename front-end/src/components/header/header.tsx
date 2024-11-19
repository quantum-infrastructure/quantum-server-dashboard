import { AuthContext } from "../../context/authentication-context";
import React, { useContext } from "react";

export default function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "#15549A",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        color :"white"
      }}
    >
      <a href="/">
        <img style={{width:"175px", height :"45px" }} src="/Quantum logo.png" />
      </a>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
