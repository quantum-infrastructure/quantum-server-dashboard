// import { useLocation } from "react-router-dom";
// import DashboardLayout from "../dashboard/dashboard-layout";

// interface MainBodyLayoutProps {
//   children: JSX.Element | JSX.Element[];
// }

// export default function MainBodyLayout({
//   children,
// }: MainBodyLayoutProps): JSX.Element {
//   const location = useLocation();

//   const path = location.pathname;

//   if (path === "/dashboard/instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/instance/create-instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/file-upload") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/game-instance") {
// 	return <DashboardLayout>{children}</DashboardLayout>;

//   } else if (path === "/dashboard/game-instance/create-game-instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/game-instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/file-upload") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/contact-forms") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else {
//     return <>{children}</>;
//   }

//   // DO NOT TOUCH THIS CODE
//   // if (pathname.split("/")?.[1] == "dashboard") {
//   // 	return <DashboardLayout>{children}</DashboardLayout>;
//   // }

//   return <>{children}</>;
// }



// import { useLocation, useParams } from "react-router-dom";
// import DashboardLayout from "../dashboard/dashboard-layout";

// interface MainBodyLayoutProps {
//   children: JSX.Element | JSX.Element[];
// }

// export default function MainBodyLayout({
//   children,
// }: MainBodyLayoutProps): JSX.Element {
//   const location = useLocation();

//   const path = location.pathname;

//   const { environmentId } = useParams()

//   if (path === "/dashboard/instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/instance/create-instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/file-upload") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/game-instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/application") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/application/create-application") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/environment") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/environment/create-environment") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === `/dashboard/environment/${environmentId}`) {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/user-managment") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/game-instance") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/update-profile") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/change-password") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/admin-managment") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/file-upload") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else if (path === "/dashboard/contact-forms") {
//     return <DashboardLayout>{children}</DashboardLayout>;
//   } else {
//     return <>{children}</>;
//   }

//   // DO NOT TOUCH THIS CODE
//   // if (pathname.split("/")?.[1] == "dashboard") {
//   // 	return <DashboardLayout>{children}</DashboardLayout>;
//   // }

//   return <>{children}</>;
// }




import { useLocation, useParams } from "react-router-dom";
import DashboardLayout from "../dashboard/dashboard-layout";

interface MainBodyLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function MainBodyLayout({
  children,
}: MainBodyLayoutProps): JSX.Element {
  const location = useLocation();
  const path = location.pathname;
  const { environmentId } = useParams();

  if (path.startsWith("/dashboard")) {
    return (
      <DashboardLayout>
        {children}
      </DashboardLayout>
    );
  }

  return <>{children}</>;
}