import React from "react";
import { NavLink } from "react-router";
import { FaUser, FaUserMd, FaShoppingCart, FaBoxes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";


import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/allusers" className="nav-link">
            <FaUser className="icon" /> Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/pharmacies" className="nav-link">
            <SiHomeassistantcommunitystore className="icon" /> Pharmacies
          </NavLink>
        </li>
        <li>
          <NavLink to="/all-products" className="nav-link">
            <GiMedicines className="icon" /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/supplies" className="nav-link">
            <FaCodePullRequest className="icon" /> Supplies
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="nav-link">
            <FaShoppingCart className="icon" /> Orders
          </NavLink>
        </li>
      </ul>
      {/* <h2 className="sidebar-title">Pharma Connect</h2> */}
    </div>
  );
};

export default Sidebar;
