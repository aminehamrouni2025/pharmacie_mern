import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const UpdateUser = ({ isOpen, setIsOpen, user  }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    address: user?.address || "",
    image: null,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("address", formData.address);
      //   if (formData.image) formDataToSend.append("image", formData.image);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Send new image if selected
      }

      await axios.put(
        `http://localhost:5000/api/admin/update-user/${user._id}`, // Use selected user's ID
        formDataToSend,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    //   updateUsers(response.data.data);
      alert("User updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update User</h2>
          <AiOutlineClose
            className="close-icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
