import { AuthContext } from "../../context/authentication-context";
import React, { useContext } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="flex h-20 px-5 justify-between items-center bg-gray-800 text-white">

      {/* <a href="/"> */}
        <img
          // style={{ width: "125px", height: "45px" }}
          src="/Quantum logo.png"
          className="w-[125px] h-[45px]"
        />
      {/* </a> */}
      {!user ? (
        null
      ) : (
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
}
