// src/routes/RoutesPath.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import DashBoard from "../pages/dashboard/DashBoard";
import AdminHomePage from "../adminpannel/AdminHomePage";
import PrivateRoute from "./PrivateRoute";

const RoutesPath = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
