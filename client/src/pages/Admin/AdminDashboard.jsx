import React from "react";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import "./AdminDashboard.css";
import { Outlet } from "react-router";
import AdminSidebar from "./Sidebar/AdminSidebar"
function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      {/* content */}

      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <AdminSidebar/>
        </div>
        <div className="admin-cards">2</div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
