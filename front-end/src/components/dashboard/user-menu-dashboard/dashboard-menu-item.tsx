import React from "react";
import { useLocation } from "react-router-dom";

interface UserDashboardMenuItemProps {
	tranlsationKey: string;
	iconClassName?: string;
	link: string;
	selectedIconClassName?: string;
}

export default function UserDashboardMenuItem({
	tranlsationKey,
	iconClassName,
	selectedIconClassName,
	link,
}: UserDashboardMenuItemProps) {

	const location = useLocation();

	const  path  = location.pathname;

	return (
		<div style={{ backgroundColor: path == link ? "#9E36B2" : "" , borderRadius : "0.25rem" }}>
			<a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" href={link}>
				<div
					
				>
					<div  />
					{/* <div className={iconClassName} /> */}
					{/* {pathname == link ? (
						<div
						 className={selectedIconClassName} 
						 />
					) : (
						<div 
						className={iconClassName}
						 />
					)} */}

					<div
						
					>
						{tranlsationKey}
					</div>
				</div>
			</a>
		</div>
	);
}
