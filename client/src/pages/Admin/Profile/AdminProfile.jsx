import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProfile.css";
import { FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";

import { Link, useNavigate } from "react-router";

const AdminProfile = () => {
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
  console.log(getProfile);
  console.log(getProfile.image);
  return (
    <div className="admin-profile">
      <h3 className="profile-title">Admin Profile</h3>
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-header">
            <img src={getProfile.image} alt="Profile" className="profile-img" />
            <h2>
              <GoPersonFill />
              {getProfile.fullName}
            </h2>

            <button
              className="edit-btn"
              onClick={() => navigate("/admin/profile/edit")}
            >
              <FaEdit /> Edit
            </button>
          </div>
          <div className="profile-info">
            <p>
              <MdEmail />
              <strong>Email:</strong> {getProfile.email}
            </p>
            <p>
              <IoLocation />
              <strong>Address:</strong> {getProfile.address}
            </p>
          </div>
        </div>
        <div className="profile-right">
          <iframe
            width="100%"
            height="100%"
            className="map-container"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              getProfile.address
            )}&output=embed`}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
