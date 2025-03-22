import React, { useState } from "react";
import "./Login.css";
import MyLogo from "../../assets/pharma.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleChange = (e) => {

  // };
  const navigate = useNavigate();

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log("Form Data Submitted:", formData);

   axios
     .post("http://localhost:5000/api/users/login", formData)
     .then((response) => {
       const { token, role, id } = response.data;

       // Store token and role in local storage
       localStorage.setItem("token", token);
       localStorage.setItem("role", role);
       localStorage.setItem("id", id);

       // Success toast message
       toast.success("✅ Welcome Back!", {
         position: "top-right",
         autoClose: 3000,
       });

       // Navigate based on role
       setTimeout(() => {
         if (role === "admin") {
           navigate("/admin");
         } else if (role === "pharmacist") {
           navigate("/pharmacist");
         } else {
           navigate("/client");
         }
       }, 1500);
     })
     .catch((error) => {
       console.error("Login error:", error);

       // Error toast message
       toast.error("❌ Invalid Email or Password!", {
         position: "top-right",
         autoClose: 3000,
       });
     });
 };

  return (
    <div className="login-page">
      <ToastContainer />

      <div className="div2">
        {" "}
        <img src={MyLogo} />
      </div>
      <div className="login-form">
        <h3>Welcome Back </h3>
        <form>
          <div className="input-group">
            <label>
              <FaEnvelope className="icon" /> Email:
            </label>
            <input
              type="text"
              placeholder="Type your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
            />
          </div>

          <div className="input-group">
            <label>
              <FaLock className="icon" /> Password:
            </label>
            <input
              type="password"
              placeholder="Type your Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              name="password"
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
        {/* Register Link */}
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Please Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
