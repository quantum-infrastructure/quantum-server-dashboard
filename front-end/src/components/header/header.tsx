import { AuthContext } from "../../context/authentication-context";
import React, { useContext } from "react";

export default function Header (){

    const { logout } = useContext(AuthContext);


return (
    <div style={{height:"50px" , backgroundColor:"red" ,padding : "10px" }} >
       <a href="/"> Header </a>
       <button onClick={logout} >logout</button>
    </div>
);
    


}