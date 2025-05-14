import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">EXCEL ANALYTICS</h2>
        <ul className="space-y-4">
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "Dashboard" ? "bg-green-700" : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "Upload Files"
                ? "bg-green-700"
                : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("Upload Files")}
          >
            Upload Files
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "File History"
                ? "bg-green-700"
                : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("File History")}
          >
            File History
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "Visualizations"
                ? "bg-green-700"
                : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("Visualizations")}
          >
            Visualizations
          </li>

          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "Smart Insight"
                ? "bg-green-700"
                : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("Smart Insight")}
          >
            Smart Insight
          </li>

          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "Downloads" ? "bg-green-700" : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("Downloads")}
          >
            Downloads
          </li>

          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "Account Settings"
                ? "bg-green-700"
                : "hover:bg-green-900"
            }`}
            onClick={() => handleTabClick("Account Settings")}
          >
            Account Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-green-100">
        {/* Header */}
        <div className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-xl font-semibold">Welcome {userName}!</h1>
 
          <NavLink
            to="/"
            onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("userName") // Clear user details
            }}
            className="rounded-lg bg-green-100 py-2 px-4 font-medium hover:bg-green-200 focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
          >
            Log Out
          </NavLink>
     
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Total Files</h3>
              <p className="text-2xl">24</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Rows Processed</h3>
              <p className="text-2xl">56,930</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Most Used File</h3>
              <p>Pie Chart Placeholder</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">Category Breakdown</h3>
              <p>Line Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
