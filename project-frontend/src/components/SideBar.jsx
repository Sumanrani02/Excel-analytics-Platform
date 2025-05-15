import React, { useState } from "react";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState("DashBoard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="h-screen">
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
    </div>
  );
};

export default SideBar;
