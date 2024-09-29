// import React from "react";

// function Login(): JSX.Element {
//     return (
//       <div style={{width :500 , height: 500 , backgroundColor:"red"}} >
//        hi
//       </div>
//     );
//   }

//   export default Login

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authentication-context";
import { useNavigate } from 'react-router-dom';
import { ApiLookUpContext } from "../../context/api-look-up-context";


function Login() {
  // const { user } = useAuth();
  const { user, login,loginResult } = useContext(AuthContext);

  const { graphUrl } = ApiLookUpContext();

  console.log(graphUrl,"HIIII")


  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  if(loginResult.data?.login.success){
    console.log("HIIIIIIBIIIII")
    navigate('/dashboard', { replace: true });

  }

  console.log(user,"USERCHIKA")

  if(user){
    navigate('/dashboard', { replace: true });

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
          {/* {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{graphUrl}</p>} */}
          {graphUrl}

        </h2>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            login({
              variables: {
                email,
                password,
              },
            });
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your username"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {/* {user?.email} - - - - {sessionCheckStatus} */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password1
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            {/* <button type="button" onClick={logout}>Sign Out</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;















// <form
//   method="post"
//   onSubmit={(e) => {
//     e.preventDefault();
//     login({
//       variables: {
//         email,
//         password,
//       },
//     });
//   }}
//   style={{ backgroundColor: "red" }}
// >
//   <input
//     type="text"
//     value={email}
//     onChange={(e: any) => {
//       setEmail(e.target.value);
//     }}
//   />
//   <input
//     type="password"
//     value={password}
//     onChange={(e: any) => {
//       setPassword(e.target.value);
//     }}
//   />

//   <button type="submit">Sign In</button>
//   <button type="button" onClick={logout}>Sign Out</button>
//   {user?.email} - - - - {sessionCheckStatus}

// </form>










// #   "build": "CI=false react-scripts build"

//      "build": "react-scripts build",
