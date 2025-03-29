import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import "./AdminNavbar.css";
const AdminNavbar = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [getProfile, setGetProfile] = useState({});
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/profile/${id}`,
          {
            headers: {
              Authorization: token, // Send token in Authorization header
            },
          }
        );
        setGetProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (id && token) fetchProfile();
  }, [id, token]);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="admin-navbar">
      <div className="nav">
        <h3 className="navbar-title">Pharma Connect Admin 💊</h3>
      </div>
      <div className="dropdown">
        <button
          className="avatar-btn"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          <img
            className="avatar"
            src={getProfile.image}
            // alt="Admin Avatar"
          />
        </button>
      </div>
      {openDropDown && (
        <div className="dropdown-menu">
          <Link to="profile" className="dropdown-item">
            Profile
          </Link>
          <button onClick={logout} className="dropdown-item" id="dropdown-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
