import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="w-1/5 fixed top-0 left-0">
      <div className="w-full h-screen bg-green-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">EXCEL ANALYTICS</h2>
        <ul className="space-y-4">
          <Link to="/dashboard" className="">
            <li
              className={`p-2 rounded cursor-pointer ${
                location.pathname === "/dashboard"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link to="/upload-files" className="">
            <li
              className={`p-2 mt-4 rounded cursor-pointer ${
                location.pathname === "/upload-files"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              Upload Files
            </li>
          </Link>
          <Link to="/file-history" className="">
            <li
              className={`p-2 mt-4 rounded cursor-pointer ${
                location.pathname === "/file-history"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              File History
            </li>
          </Link>
          <Link to="/visualize" className="">
            <li
              className={`p-2 mt-4 rounded cursor-pointer ${
                location.pathname === "/visualize"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              Visualizations
            </li>
          </Link>
          <Link to="/smart-insight" className="">
            <li
              className={`p-2 mt-4 rounded cursor-pointer ${
                location.pathname === "/smart-insight"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              Smart Insight
            </li>
          </Link>
          <Link to="/account-settings" className="">
            <li
              className={`p-2 mt-4 rounded cursor-pointer ${
                location.pathname === "/account-settings"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              Account Settings
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
