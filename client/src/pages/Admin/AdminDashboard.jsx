import React from "react";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import "./AdminDashboard.css";
import { Outlet } from "react-router";
import AdminSidebar from "./Sidebar/AdminSidebar"
import TopBar from "./TopBar/TopBar";
function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      {/* content */}

      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <AdminSidebar/>
        </div>
        <div className="admin-cards">
          <TopBar/>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
