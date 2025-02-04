
import { AuthContext } from "../../context/authentication-context";
import React, { useContext } from "react";

export default function Test(){


    const { user, login,loginResult } = useContext(AuthContext);



    return (
        <div>
            {user?.email}
            
            This is dashboard page
        </div>
    );
}



