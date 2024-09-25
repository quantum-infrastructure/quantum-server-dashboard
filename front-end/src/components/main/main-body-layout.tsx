import { useLocation } from 'react-router-dom';
import DashboardLayout from "../dashboard/dashboard-layout";

interface MainBodyLayoutProps {
	children: JSX.Element | JSX.Element[];
}

export default function MainBodyLayout({
	children,
}: MainBodyLayoutProps): JSX.Element {
	const location = useLocation();

	const  path  = location.pathname;


	
	if (path === "/dashboard/instance") {
		return <DashboardLayout>{children}</DashboardLayout>;
	} else if (path === "/dashboard/instance/create-instance") {
		return <DashboardLayout>{children}</DashboardLayout>;
	} else if (path === "/dashboard/file-upload") {
		return <DashboardLayout>{children}</DashboardLayout>;
	} else if (path === "/dashboard") {
		return <DashboardLayout>{children}</DashboardLayout>;
	}else if (path === "/dashboard/contact-forms") {
		return <DashboardLayout>{children}</DashboardLayout>;
	}
	 else {
		return <>{children}</>;
	}

	// DO NOT TOUCH THIS CODE
	// if (pathname.split("/")?.[1] == "dashboard") {
	// 	return <DashboardLayout>{children}</DashboardLayout>;
	// }

	return <>{children}</>;
}
