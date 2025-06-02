import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
  const { user } = useAuth();

  const location = useLocation();
  const adminRoutes = [
    { path: "/admin/home", label: "Dashboard" },
    { path: "/account-settings", label: "Account Settings" },
  ];

  const commonRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/upload-files", label: "Upload Files" },
    { path: "/file-history", label: "File History" },
    { path: "/visualize", label: "Visualizations" },
    { path: "/smart-insight", label: "Smart Insight" },
    { path: "/account-settings", label: "Account Settings" },
  ];

  const routes = user.role === "admin" ? adminRoutes : commonRoutes;

  return (
    <div className="w-1/5 fixed top-0 left-0">
      <div className="w-full h-screen bg-green-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">EXCEL ANALYTICS</h2>
        <ul className="space-y-4">
          {routes.map((route) => (
            <Link to={route.path} key={route.path}>
              <li
                className={`p-2 rounded cursor-pointer my-4 ${
                  location.pathname === route.path
                    ? "bg-green-700"
                    : "hover:bg-green-900"
                }`}
              >
                {route.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
