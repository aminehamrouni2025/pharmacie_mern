import { FaEnvelope, FaLock, FaUser, FaUserTag } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import MyLogo from "../../../assets/pharma.png";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import "./Register.css";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    axios
      .post("http://localhost:5000/api/users/create-user", formData)
      .then((response) => {
        // Success toast message
        toast.success(` ✅ Register success  ${response.data.data.fullName}`, {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          // Navigate based on role
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.error("Login error:", error);

        // Error toast message
        toast.error("❌ Register failed", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };
  return (
    <div className="auth-page">
      <ToastContainer />

      <div className="auth-logo">
        <img src={MyLogo} alt="Logo" />
      </div>
      <div className="auth-form">
        <h3>Create an Account</h3>
        <form>
          {/* Full Name */}
          <div className="input-group">
            <label className="input-label">
              <FaUser className="icon" /> Full Name:
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your full name"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              name="fullName"
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-label">
              <FaEnvelope className="icon" /> Email:
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label">
              <FaLock className="icon" /> Password:
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Create a password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              name="password"
            />
          </div>

          {/* Role Selection */}
          <div className="input-group">
            <label className="input-label">
              <FaUserTag className="icon" /> Role:
            </label>
            <select
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              name="role"
            >
              <option value="">Select Role</option>
              <option value="client">Client</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="auth-button"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
