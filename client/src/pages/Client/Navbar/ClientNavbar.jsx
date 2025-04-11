import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./ClientNavbar.css";

const ClientNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="client-navbar">
      <div className="navbar-left">
        <h1>Pharma Connect</h1>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="search-input"
        />

        <div className="profile-wrapper">
          <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>Profile</li>
                <li>Orders</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
