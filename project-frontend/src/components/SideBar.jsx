// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   BarChart3,
//   Home,
//   Upload,
//   History,
//   PieChart,
//   Brain,
//   Settings,
//   LogOut,
//   User,
//   ChevronRight,
//   Shield,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const SideBar = () => {
//   const navigate = useNavigate();
//   const [userRole, setUserRole] = useState("");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();
//   const { logout } = useAuth();
//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth < 640);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Fetch user role
//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     setUserRole(role || "");
//   }, []);

//   // Redirect if no user role found
//   if (!userRole) {
//     navigate("/login");
//     return null;
//   }

//   // Handle logout
//   const handleLogout = () => {
//     logout();
//   };

//   // Route definitions
//   const adminRoutes = [
//     { path: "/admin/home", label: "Dashboard", icon: Home },
//     { path: "/account-settings", label: "Account Settings", icon: Settings },
//   ];

//   const commonRoutes = [
//     { path: "/dashboard", label: "Dashboard", icon: Home },
//     { path: "/upload-files", label: "Upload Files", icon: Upload },
//     { path: "/file-history", label: "File History", icon: History },
//     { path: "/visualize", label: "Visualizations", icon: PieChart },
//     { path: "/smart-insight", label: "Smart Insight", icon: Brain },
//     { path: "/account-settings", label: "Account Settings", icon: Settings },
//   ];

//   const routes = userRole === "admin" ? adminRoutes : commonRoutes;

//   return (
//     <>
//       <div
//         className={`
//         fixed top-0 left-0 h-screen
//         bg-gradient-to-b from-emerald-950 via-emerald-800 to-green-950
//         text-white shadow-2xl transition-all duration-300 ease-in-out z-50
//         ${isCollapsed ? "w-20" : "w-64"} 
//       `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div
//             className={`p-4 border-b border-emerald-700/50 ${
//               isCollapsed ? "justify-center" : ""
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <div className="bg-gradient-to-r from-emerald-400 to-green-400 text-emerald-900 w-10 h-10 flex items-center justify-center rounded-xl shadow-lg flex-shrink-0">
//                 <BarChart3 size={24} />
//               </div>
//               {!isCollapsed && (
//                 <div className="overflow-hidden">
//                   <h2 className="text-xl font-bold text-white whitespace-nowrap">
//                     Excel Analytics
//                   </h2>
//                   <p className="text-emerald-200 text-sm whitespace-nowrap">
//                     Data Intelligence Platform
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
//             <ul className="space-y-2">
//               {routes.map((route) => {
//                 const Icon = route.icon;
//                 const isActive = location.pathname === route.path;

//                 return (
//                   <li key={route.path}>
//                     <Link
//                       to={route.path}
//                       className={`
//                       group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ease-in-out
//                       ${
//                         isActive
//                           ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
//                           : "text-emerald-100 hover:bg-emerald-700/50 hover:text-white"
//                       }
//                       ${isCollapsed ? "justify-center" : ""}
//                     `}
//                       title={isCollapsed ? route.label : ""}
//                     >
//                       <Icon
//                         size={20}
//                         className={`
//                         transition-all duration-200 flex-shrink-0
//                         ${
//                           isActive
//                             ? "text-white"
//                             : "text-emerald-300 group-hover:text-white"
//                         }
//                       `}
//                       />
//                       {!isCollapsed && (
//                         <>
//                           <span className="font-medium flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
//                             {route.label}
//                           </span>
//                           {isActive && (
//                             <ChevronRight
//                               size={16}
//                               className="text-white/80 flex-shrink-0"
//                             />
//                           )}
//                         </>
//                       )}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>

//           {/* User Role Badge */}
//           {!isCollapsed && userRole && (
//             <div className="p-3 border-t border-emerald-700/50 flex items-center gap-3 text-emerald-200">
//               {userRole === "admin" ? <Shield size={20} /> : <User size={20} />}
//               <span className="font-semibold capitalize">
//                 {userRole} Access
//               </span>
//             </div>
//           )}

//           {/* Footer - Logout Button */}
//           <div className="p-3 border-t border-emerald-700/50">
//             <button
//               onClick={handleLogout}
//               className={`
//               w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ease-in-out
//               text-emerald-100 hover:bg-red-600/20 hover:text-red-300 group
//               ${isCollapsed ? "justify-center" : ""}
//             `}
//               title={isCollapsed ? "Logout" : ""}
//             >
//               <LogOut
//                 size={20}
//                 className="text-emerald-300 group-hover:text-red-300 transition-colors flex-shrink-0"
//               />
//               {!isCollapsed && (
//                 <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
//                   Logout
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideBar;







import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Home,
  Upload,
  History,
  PieChart,
  Brain,
  Settings,
  LogOut,
  User,
  ChevronRight,
  Shield,
} from 'lucide-react';

const SideBar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // Fetch user role 
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role || "");
  }, []);

  // Redirect if no user role found 
  if (!userRole) {
    navigate("/login");
    return null;
  }

  // Handle logout 
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Route definitions 
  const adminRoutes = [
    { path: "/admin/home", label: "Dashboard", icon: Home },
    { path: "/account-settings", label: "Account Settings", icon: Settings },
  ];

  const commonRoutes = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/upload-files", label: "Upload Files", icon: Upload },
    { path: "/file-history", label: "File History", icon: History },
    { path: "/visualize", label: "Visualizations", icon: PieChart },
    { path: "/smart-insight", label: "Smart Insight", icon: Brain },
    { path: "/account-settings", label: "Account Settings", icon: Settings },
  ];

  const routes = userRole === "admin" ? adminRoutes : commonRoutes;

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen
        bg-gradient-to-b from-emerald-950 via-emerald-800 to-green-950
        text-white shadow-2xl transition-all duration-300 ease-in-out z-50
        ${isCollapsed ? 'w-20' : 'w-64'} 
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`p-4 border-b border-emerald-700/50 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-emerald-400 to-green-400 text-emerald-900 w-10 h-10 flex items-center justify-center rounded-xl shadow-lg flex-shrink-0">
              <BarChart3 size={24} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h2 className="text-xl font-bold text-white whitespace-nowrap">Excel Analytics</h2>
                <p className="text-emerald-200 text-sm whitespace-nowrap">Data Intelligence Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          <ul className="space-y-2">
            {routes.map((route) => {
              const Icon = route.icon;
              const isActive = location.pathname === route.path;

              return (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className={`
                      group flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ease-in-out
                      ${isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                        : 'text-emerald-100 hover:bg-emerald-700/50 hover:text-white'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? route.label : ''} 
                  >
                    <Icon
                      size={20}
                      className={`
                        transition-all duration-200 flex-shrink-0
                        ${isActive ? 'text-white' : 'text-emerald-300 group-hover:text-white'}
                      `}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{route.label}</span>
                        {isActive && (
                          <ChevronRight size={16} className="text-white/80 flex-shrink-0" />
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Role Badge */}
        {!isCollapsed && userRole && (
            <div className="p-3 border-t border-emerald-700/50 flex items-center gap-3 text-emerald-200">
                {userRole === 'admin' ? <Shield size={20} /> : <User size={20} />}
                <span className="font-semibold capitalize">{userRole} Access</span>
            </div>
        )}

        {/* Footer - Logout Button */}
        <div className="p-3 border-t border-emerald-700/50">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ease-in-out
              text-emerald-100 hover:bg-red-600/20 hover:text-red-300 group
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Logout' : ''} 
          >
            <LogOut
              size={20}
              className="text-emerald-300 group-hover:text-red-300 transition-colors flex-shrink-0"
            />
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">Logout</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;