import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
const CreateUser = ({
  newUser,
  setNewUser,
  newUserModal,
  setNewUserModal,
  getUsers,
}) => {
  const { fullName, email, password, role, address } = newUser;

  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", newUser);
    try {
      const response = axios
        .post("http://localhost:5000/api/admin/create-user", newUser, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Success toast message
          toast.success(` ✅ User Created successfully `, {
            position: "top-right",
            autoClose: 3000,
          });
          getUsers();
          setNewUserModal(false);
        });
    } catch (error) {
      toast.error("❌ Register failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create User</h2>
          <AiOutlineClose
            className="close-icon"
            onClick={() => setNewUserModal(false)}
          />
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <select
            className="input-field"
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            name="role"
          >
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="pharmacist">Pharmacist</option>
          </select>
          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
