import React from "react";
import "./PharmacistDashboard.css";
import PharmaNavbar from "./PharmaNavbar/PharmaNavbar";
import PharmacistSidebar from "./PharmacistSidebar/PharmacistSidebar";
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
        <div className="pharma-cards">3</div>
        <div className="pharma-content">4</div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
