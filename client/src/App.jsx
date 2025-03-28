import { useState } from "react";

import "./App.css";
import LandingPage from "./components/Landing/LandingPage";
import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
import ClientDashboard from "./pages/Client/ClientDashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import AdminProfile from "./pages/Admin/Profile/AdminProfile";
import Register from "./pages/Auth/Register/Register";
import EditProfile from "./pages/Admin/Profile/EditProfile";
import AllUsers from "./pages/Admin/AllUsers/AllUsers";
import Pharmacies from "./pages/Admin/Pharmacist/Pharmacies";
import AdminCharts from "./pages/Admin/AdminCharts/AdminCharts";
import Product from "./pages/Admin/Product/Product";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Routes protégées */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route> */}
      {/* Routes protégées selon le rôle */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="pharmacies" element={<Pharmacies />} />
          <Route path="product" element={<Product />} />
          <Route path="" element={AdminCharts} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["pharmacist"]} />}>
        <Route path="/pharmacist" element={<PharmacistDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
        <Route path="/client" element={<ClientDashboard />} />
      </Route>

      {/* Redirection selon le rôle */}
      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            <Navigate to={`/${localStorage.getItem("role")}`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Route par défaut si l'URL est inconnue */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
