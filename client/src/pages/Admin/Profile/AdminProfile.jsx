import React, { useState, useEffect } from "react";
import axios from "axios";


const AdminProfile = () => {
  const [getProfile, setGetProfile] = useState({});
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/user/${id}`,
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
console.log(getProfile)
  return (
    <div>
      <h3>{getProfile.fullName}</h3>
      <h3>{getProfile.email}</h3>
      <h3>{getProfile.address}</h3>
      <img
      src={getProfile.image}
      />
    </div>
  );
};

export default AdminProfile;
