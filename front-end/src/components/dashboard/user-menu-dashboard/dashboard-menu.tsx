import UserDashboardMenuItem from "./dashboard-menu-item";

import { useContext } from "react";
import { AuthContext } from "../../../context/authentication-context";
import {
  ArrowUpTrayIcon,
  CpuChipIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

interface DashboardMenuProps {}

// export default function DashboardMenu({}: DashboardMenuProps): JSX.Element {
//   const { user, login, logout, sessionCheckStatus } = useContext(AuthContext);

//   return (
//     <div
//       style={{ minHeight: "100%" }}
//       className="flex min-h-screen bg-gray-100 font-sans w-max"
//     >
//       <aside className="w-64 text-white bg-gray-800">
//         <nav className="mt-10">
//           <UserDashboardMenuItem
//             link="/dashboard/file-upload"
//             tranlsationKey="File Upload"
//             icon={<ArrowUpTrayIcon className="w-5 h-5 text-white" />}
//           />
//           <UserDashboardMenuItem
//             link="/dashboard/game-instance"
//             tranlsationKey="Game Instance"
//             icon={<CpuChipIcon className="w-5 h-5 text-white" />}
//           />
//         </nav>
//       </aside>
//     </div>
//   );
// }


export default function DashboardMenu({}: DashboardMenuProps): JSX.Element {
  return (
    <div className="h-full">
<aside className="w-64 h-full overflow-y-auto bg-gray-800 text-white scrollbar-hide">
      <nav className="mt-10">
          <UserDashboardMenuItem
            link="/dashboard/file-upload"
            tranlsationKey="File Upload"
            icon={<ArrowUpTrayIcon className="w-5 h-5 text-white" />}
          />
          <UserDashboardMenuItem
            link="/dashboard/game-instance"
            tranlsationKey="Game Instance"
            icon={<CpuChipIcon className="w-5 h-5 text-white" />}
          />
         
        </nav>
      </aside>
    </div>
  );
}
