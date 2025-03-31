import React from "react";
import "./PharmacistDashboard.css";
import PharmaNavbar from "./PharmaNavbar/PharmaNavbar";
import PharmacistSidebar from "./PharmacistSidebar/PharmacistSidebar";
import PharmaStats from "./PharmaStats/PharmaStats";
import { Outlet, useLocation } from "react-router";
import PharmacistCharts from "./PharmacistCharts/PharmacistCharts";

const PharmacistDashboard = () => {
    const location = useLocation()
  
  return (
    <div className="dashboard-all">
      <div className="pharmacist-dashboard">
        <div className="pharmacist-navbar">
          <PharmaNavbar />
        </div>
        <div className="pharma-sidebar">
          <PharmacistSidebar />
        </div>
        <div className="pharma-cards">
          <PharmaStats />
        </div>
        <div className="pharma-content">
          {location.pathname === "/pharmacist" && <PharmacistCharts/>}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
