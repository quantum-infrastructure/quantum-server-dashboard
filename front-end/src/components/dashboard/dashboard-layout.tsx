import DashboardMenu from "./user-menu-dashboard/dashboard-menu";
interface DashboardLayoutProps {
  children: JSX.Element | JSX.Element[];
}

// export default function DashboardLayout({
//   children,
// }: DashboardLayoutProps): JSX.Element {
//   return (
// 	<div className="flex h-full">
//       <div className="w-64 h-full overflow-y-auto bg-gray-800 shrink-0"> 
// 	  <DashboardMenu />
//       </div>
//       <div className="flex-1 overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function DashboardLayout({
//   children,
// }: DashboardLayoutProps): JSX.Element {
//   return (
//     <div className="flex h-screen">
//       <div className="w-64 h-full overflow-y-auto bg-gray-800 shrink-0">
//         <DashboardMenu />
//       </div>

//       <div className="flex-1 h-screen overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// }

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
   

    <div className="flex h-screen">
    <div className="w-64 h-screen overflow-y-auto bg-gray-800 shrink-0 scrollbar-hide">
      <DashboardMenu />
    </div>

    <div className="flex-1 h-screen overflow-y-auto">
      <div className="h-full overflow-y-auto scrollbar-hide">{children}</div>
    </div>
  </div>
  );
}
