import React, { useEffect, useState } from "react";
import "./TopBar.css";
import axios from "axios";
import { FaUsers, FaShoppingCart, FaBoxes } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { AiFillMedicineBox } from "react-icons/ai";


function TopBar() {
  const [stats, setStats] = useState({ totalUsers: 0, totalPharmacies: 0 });
  const token = localStorage.getItem("token");

useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: { Authorization: token },
        }
      );
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  fetchStats();
}, [token]);

  return (
    <div className="topbar">
      <div className="cards-container">
        {/* Users Card */}
        <div className="card">
          <div className="card-icon-container blue">
            <FaUsers className="card-icon" />
          </div>
          <div className="card-content">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
            <a href="#" className="details-link">
              Show Details
            </a>
          </div>
        </div>
        {/* Users Card */}
        <div className="card">
          <div className="card-icon-container pink">
            <AiFillMedicineBox className="card-icon" />
          </div>
          <div className="card-content">
            <h3>Pharmacies</h3>
            <p>{stats.totalPharmacies}</p>
            <a href="#" className="details-link">
              Show Details
            </a>
          </div>
        </div>

        {/* Orders Card */}
        <div className="card">
          <div className="card-icon-container green">
            <FaShoppingCart className="card-icon" />
          </div>
          <div className="card-content">
            <h3>Total Orders</h3>
            {/* <p>{stats.orders}</p> */}
            <a href="#" className="details-link">
              Show Details
            </a>
          </div>
        </div>

        {/* Supplies Card */}
        <div className="card">
          <div className="card-icon-container yellow">
            <FaBoxes className="card-icon" />
          </div>
          <div className="card-content">
            <h3>Total Supplies</h3>
            {/* <p>{stats.supplies}</p> */}
            <a href="#" className="details-link">
              Show Details
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-icon-container  red">
            <GiReceiveMoney className="card-icon" />
          </div>
          <div className="card-content">
            <h3>Total Income</h3>
            {/* <p>{stats.supplies}</p> */}
            <a href="#" className="details-link">
              Show Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
