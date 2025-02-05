// import DashboardMenu from "./user-menu-dashboard/dashboard-menu";
// // import classes from "./dashboard-layout.module.css";

// interface DashboardLayoutProps {
// 	children: JSX.Element | JSX.Element[];
// }

// export default function DashboardLayout({
// 	children,
// }: DashboardLayoutProps): JSX.Element {
// 	return (
// 		<div 
// 		className="flex flex-row 	"
// 		// className={classes.dashboardLayoutMainContainer}

// 		>
			

// 				<div>				<DashboardMenu />
// </div>

// 				<div className="pt-7 pl-7"> {children}</div>
// 		</div>
// 	);
// }



import DashboardMenu from "./user-menu-dashboard/dashboard-menu";
// import classes from "./dashboard-layout.module.css";

interface DashboardLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    // <div
    // //   className="flex flex-row w-full h-full"
    //   // className={classes.dashboardLayoutMainContainer}
	//   className="min-h-screen flex"
    // >
    //     <DashboardMenu />

    //   <div className="pt-7 pl-7 w-full h-full"> {children}</div>
    // </div>

	<div className="flex h-full">
      <div className="w-64 h-full overflow-y-auto bg-gray-800 shrink-0"> 
	  <DashboardMenu />
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
