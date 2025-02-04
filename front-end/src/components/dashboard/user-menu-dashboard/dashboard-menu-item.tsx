// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// interface UserDashboardMenuItemProps {
// 	tranlsationKey: string;
// 	iconClassName?: string;
// 	link: string;
// 	selectedIconClassName?: string;
// }

// export default function UserDashboardMenuItem({
// 	tranlsationKey,
// 	iconClassName,
// 	selectedIconClassName,
// 	link,
// }: UserDashboardMenuItemProps) {

// 	const location = useLocation();

// 	const  path  = location.pathname;

// 	return (
// 		<div style={{ backgroundColor: path == link ? "#9E36B2" : "" , borderRadius : "0.25rem" }}>
// 			<Link className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" to={link}>
// 				<div
					
// 				>
// 					<div  />
// 					{/* <div className={iconClassName} /> */}
// 					{/* {pathname == link ? (
// 						<div
// 						 className={selectedIconClassName} 
// 						 />
// 					) : (
// 						<div 
// 						className={iconClassName}
// 						 />
// 					)} */}

// 					<div
						
// 					>
// 						{tranlsationKey}
// 					</div>
// 				</div>
// 			</Link>
// 		</div>
// 	);
// }


// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// interface UserDashboardMenuItemProps {
// 	tranlsationKey: string;
// 	iconClassName?: string;
// 	link: string;
// 	selectedIconClassName?: string;
// }

// export default function UserDashboardMenuItem({
// 	tranlsationKey,
// 	iconClassName,
// 	selectedIconClassName,
// 	link,
// }: UserDashboardMenuItemProps) {

// 	const location = useLocation();

// 	const  path  = location.pathname;

// 	return (
// 		<div style={{ backgroundColor: path == link ? "#9E36B2" : "" , borderRadius : "0.25rem" }}>
// 			<Link className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" to={link}>
// 				<div
					
// 				>
// 					<div  />
// 					{/* <div className={iconClassName} /> */}
// 					{/* {pathname == link ? (
// 						<div
// 						 className={selectedIconClassName} 
// 						 />
// 					) : (
// 						<div 
// 						className={iconClassName}
// 						 />
// 					)} */}

// 					<div
						
// 					>
// 						{tranlsationKey}
// 					</div>
// 				</div>
// 			</Link>
// 		</div>
// 	);
// }




import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UsersIcon,
  CubeIcon,
  GlobeAltIcon,
  CogIcon,
} from "@heroicons/react/24/outline"; // Import relevant icons

interface UserDashboardMenuItemProps {
  tranlsationKey: string;
  icon?: JSX.Element; // Icon can be passed as a JSX element
  link: string;
  selectedIconClassName?: string;
}

export default function UserDashboardMenuItem({
  tranlsationKey,
  icon,
  selectedIconClassName,
  link,
}: UserDashboardMenuItemProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div style={{ backgroundColor: path == link ? "#9E36B2" : "", borderRadius: "0.25rem" }}>
      <Link
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        to={link}
      >
        <div className="flex items-center">
          {/* Display the icon */}
          {icon && <div className="mr-3">{icon}</div>}
          <div>{tranlsationKey}</div>
        </div>
      </Link>
    </div>
  );
}
