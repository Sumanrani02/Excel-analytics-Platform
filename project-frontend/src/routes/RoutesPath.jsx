// src/routes/RoutesPath.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/auth/Home"
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import DashBoard from "../pages/dashboard/DashBoard";
import AdminHomePage from "../pages/admin/AdminHomePage";
import PrivateRoute from "./PrivateRoute";
import UploadFiles from "../pages/dashboard/UploadFiles";

const RoutesPath = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
       <Route
        path="/upload/files"
        element={
            <UploadFiles />
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
  );
};

export default RoutesPath;
