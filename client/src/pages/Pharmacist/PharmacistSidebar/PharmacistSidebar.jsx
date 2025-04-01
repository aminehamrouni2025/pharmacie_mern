import React from "react";
import { NavLink } from "react-router";
import { FaShoppingCart  } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdOutlineInventory } from "react-icons/md";

import "./PharmacistSidebar.css";

const PharmacistSidebar = () => {
  return (
    <div className="pharmacist-sidebar">
      <ul className="pharmacist-sidebar-menu">
        <li>
          <NavLink to="/pharmacist" className="pharmacist-nav-link">
            <SiHomeassistantcommunitystore className="icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/pharmacist/product " className="pharmacist-nav-link">
            <GiMedicines className="pharmacist-icon" /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/pharmacist/product " className="pharmacist-nav-link">
            <MdOutlineInventory className="pharmacist-icon" /> Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/supplies" className="pharmacist-nav-link">
            <FaCodePullRequest className="pharmacist-icon" /> Supplies
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="pharmacist-nav-link">
            <FaShoppingCart className="pharmacist-icon" /> Orders
          </NavLink>
        </li>
      </ul>
      {/* <h2 className="sidebar-title">Pharma Connect</h2> */}
    </div>
  );
};

export default PharmacistSidebar;
