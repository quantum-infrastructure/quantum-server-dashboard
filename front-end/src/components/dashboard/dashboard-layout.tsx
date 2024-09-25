import DashboardMenu from "./user-menu-dashboard/dashboard-menu";
// import classes from "./dashboard-layout.module.css";

interface DashboardLayoutProps {
	children: JSX.Element | JSX.Element[];
}

export default function DashboardLayout({
	children,
}: DashboardLayoutProps): JSX.Element {
	return (
		<div 
		className="flex flex-row 	"
		// className={classes.dashboardLayoutMainContainer}

		>
			

				<div>				<DashboardMenu />
</div>

				<div className="pt-7 pl-7"> {children}</div>
		</div>
	);
}
