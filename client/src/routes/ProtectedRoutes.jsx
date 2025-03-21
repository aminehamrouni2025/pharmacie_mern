// import React from "react";
// import { Navigate, Outlet } from "react-router";

// const ProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   console.log(isAuthenticated);

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

