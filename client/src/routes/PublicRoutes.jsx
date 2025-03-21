import React from "react";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;
