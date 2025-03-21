import React, { useState } from "react";
import "./Login.css";
import MyLogo from "../../assets/pharmalogo.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";
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
        // console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("id", id);
        if (role == "admin") {
          navigate("/admin");
        } else if (role == "pharmacist") {
          navigate("/pharmacist");
        } else {
          navigate("/client");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-page">
      <div className="div1">
        <h1>
          Welcome to <span>Pharma Connect</span>
        </h1>
        <h1>
          Bridging Healthcare, Connecting <span>Lives</span>
        </h1>
        {/* <img 
        src={MyLogo}
        /> */}
      </div>
      <div className="div2">
        {" "}
        <img src={MyLogo} />
      </div>
      <div className="div3">
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
      </div>
    </div>
  );
}

export default Login;
