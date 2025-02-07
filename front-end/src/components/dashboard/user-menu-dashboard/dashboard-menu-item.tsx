import React from "react";
import { Link, useLocation } from "react-router-dom";

interface UserDashboardMenuItemProps {
  tranlsationKey: string;
  icon?: JSX.Element;
  link: string;
}

export default function UserDashboardMenuItem({
  tranlsationKey,
  icon,
  link,
}: UserDashboardMenuItemProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      style={{
        backgroundColor: path == link ? "#9E36B2" : "",
        borderRadius: "0.25rem",
      }}
    >
      <Link
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        to={link}
      >
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <div>{tranlsationKey}</div>
        </div>
      </Link>
    </div>
  );
}
