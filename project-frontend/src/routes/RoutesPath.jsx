import React, { useEffect, useState } from "react";
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
import SmartInsight from "../pages/dashboard/SmartInsight";
import Settings from "../pages/dashboard/Settings";
import ChartVisualise from "../pages/dashboard/ChartVisualise";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const RoutesPath = () => {

  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const noSidebarRoutes = ["/", "/login", "/register", "/forgot-password"];
  const isNoSidebarRoute =
    noSidebarRoutes.includes(location.pathname) ||
    location.pathname.match(/^\/reset-password\/.+/);

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMainContentMargin = () => {
    if (isNoSidebarRoute) return "ml-0";
    return sidebarCollapsed ? "ml-20" : "ml-64";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render Sidebar */}
      {!isNoSidebarRoute && <SideBar />}

      {/* Main content */}
      <div
        className={`
          transition-all duration-300 ease-in-out min-h-screen
          ${getMainContentMargin()}
        `}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

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
                <ChartVisualise />
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
