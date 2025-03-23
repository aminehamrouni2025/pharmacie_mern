import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./EditProfile.css";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    address: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/user/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setProfile({
          fullName: response.data.data.fullName || "",
          email: response.data.data.email || "",
          address: response.data.data.address || "",
          image: response.data.data.image || "",
        });
        console.log(profile)
        setPreview(response.data.data.image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (id && token) fetchProfile();
  }, [id, token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", profile.fullName);
    formData.append("email", profile.email);
    formData.append("address", profile.address);
    if (profile.image instanceof File) {
      formData.append("image", profile.image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admin/update-admin/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="edit-profile-card">
      <button className="back-btn" onClick={() => navigate("/profile")}>
        <FaArrowLeft /> Back to Profile
      </button>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          required
        />

        <label>Profile Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}

        <button type="submit" className="save-btn">
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
