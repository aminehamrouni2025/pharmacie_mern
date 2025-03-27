import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import "./AdminDashboard.css";
import { Outlet, useLocation } from "react-router";
import AdminSidebar from "./Sidebar/AdminSidebar";
import TopBar from "./TopBar/TopBar";
import AdminCharts from "./AdminCharts/AdminCharts";
function AdminDashboard() {
  const location = useLocation()

  return (
    <>
      <AdminNavbar />
      {/* content */}

      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <AdminSidebar />
        </div>
        <div className="admin-cards">
          <TopBar />
        </div>
        <div className="admin-content">
          {location.pathname==="/admin" && <AdminCharts/>}
           <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
