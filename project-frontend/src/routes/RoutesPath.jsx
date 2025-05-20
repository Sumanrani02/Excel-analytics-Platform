import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/auth/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import DashBoard from "../pages/dashboard/DashBoard";
import AdminHomePage from "../pages/admin/AdminHomePage";
import PrivateRoute from "./PrivateRoute";
import UploadFiles from "../pages/dashboard/UploadFiles";
import SideBar from "../components/SideBar";
import History from "../pages/dashboard/History";
import Visualize from "../pages/dashboard/Visualize";
import SmartInsight from "../pages/dashboard/SmartInsight";
import Downloads from "../pages/dashboard/Downloads";
import Settings from "../pages/dashboard/Settings";

const RoutesPath = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/register"];

  return (
    <div className="flex w-full">
      {!noSidebarRoutes.includes(location.pathname) && (
        <div className="w-1/5">
          <SideBar />
        </div>
      )}

      {/* Main content */}
      <div
        className={`${
          noSidebarRoutes.includes(location.pathname)
            ? "w-full"
            : "w-4/5 ml-1/5"
        }`}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload-files"
            element={
              <PrivateRoute>
                <UploadFiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/file-history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/visualize"
            element={
              <PrivateRoute>
                <Visualize />
              </PrivateRoute>
            }
          />
          <Route
            path="/smart-insight"
            element={
              <PrivateRoute>
                <SmartInsight />
              </PrivateRoute>
            }
          />
          <Route
            path="/downloads"
            element={
              <PrivateRoute>
                <Downloads />
              </PrivateRoute>
            }
          />
          <Route
            path="/account-settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/home"
            element={
              <PrivateRoute>
                <AdminHomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default RoutesPath;
