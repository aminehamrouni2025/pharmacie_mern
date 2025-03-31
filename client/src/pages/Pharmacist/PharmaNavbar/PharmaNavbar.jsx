import React, { useState, useEffect } from "react";
import "./PharmaNavbar.css";
import { FaHouseUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router";
import axios from "axios";
const PharmaNavbar = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");
  const pharmacistId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pharmacies/profile/${pharmacistId}`,
          {
            headers: {
              Authorization: token, // Send token in Authorization header
            },
          }
        );
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (pharmacistId && token) fetchProfile();
  }, [pharmacistId, token]);
  //
 

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="pharma__navbar">
      <div className="pharmacist-navbar">
        <h1>
          <FaHouseUser />
        </h1>
        <h2>/Dashboard</h2>
      </div>
      <div className="pharmacy-btn ">
        <button onClick={() => setOpenDropDown(!openDropDown)}>
          <img className="pharmacist-logo" 
          src={profile.image}
          />
        </button>
        {openDropDown && (
          <div className="dropdown-menu">
            <Link to="profile" className="dropdown-item">
              Profile
            </Link>
            <button
              onClick={logout}
              className="dropdown-item"
              id="dropdown-btn"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmaNavbar;
