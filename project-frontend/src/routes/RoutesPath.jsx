import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import DashBoard from "../pages/dashboard/DashBoard";
import AdminHomePage from "../adminpannel/AdminHomePage";

const RoutesPath = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/admin/home" element={<AdminHomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
};

export default RoutesPath;
