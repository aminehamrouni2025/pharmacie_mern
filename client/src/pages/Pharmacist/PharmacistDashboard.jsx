import React from "react";
import "./PharmacistDashboard.css";
import PharmaNavbar from "./PharmaNavbar/PharmaNavbar";
import PharmacistSidebar from "./PharmacistSidebar/PharmacistSidebar";
import PharmaStats from "./PharmaStats/PharmaStats";
import { Outlet, useLocation } from "react-router";

const PharmacistDashboard = () => {
  return (
    <div className="dashboard-all">
      <div className="pharmacist-dashboard">
        <div className="pharmacist-navbar">
          <PharmaNavbar />
        </div>
        <div className="pharma-sidebar"> 
          <PharmacistSidebar/>
        </div>
        <div className="pharma-cards">
          <PharmaStats/>
        </div>
        <div className="pharma-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
