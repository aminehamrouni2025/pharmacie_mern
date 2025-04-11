import React, { useState } from "react";
import "./ClientDashboard.css";
import { Outlet, useLocation } from "react-router";
import ClientNavbar from "./Navbar/ClientNavbar";
import ClientSidebar from "./CliendSideBar/ClientSidebar";

function ClientDashboard() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("medicine");

  return (
    <>
      <ClientNavbar />
      <div className="client-dashboard">
        <ClientSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="client-content">
          {/* You can pass selectedCategory as a prop to Outlet context */}
          {/* For example, Outlet context or pass it to nested routes */}
          <Outlet context={{ selectedCategory }} />
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
