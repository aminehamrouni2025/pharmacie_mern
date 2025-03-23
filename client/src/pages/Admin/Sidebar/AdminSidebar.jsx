import React from "react";
import { NavLink } from "react-router";
import { FaUser, FaUserMd, FaShoppingCart, FaBoxes } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/allusers" className="nav-link">
            <FaUser className="icon" /> Clients
          </NavLink>
        </li>
        <li>
          <NavLink to="/pharmacists" className="nav-link">
            <FaUserMd className="icon" /> Pharmacists
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="nav-link">
            <FaShoppingCart className="icon" /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/supplies" className="nav-link">
            <FaBoxes className="icon" /> Supplies
          </NavLink>
        </li>
      </ul>
      {/* <h2 className="sidebar-title">Pharma Connect</h2> */}
    </div>
  );
};

export default Sidebar;
