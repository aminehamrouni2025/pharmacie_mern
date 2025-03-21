import React, { useState } from "react";
import { useNavigate , Link} from "react-router";
import "./AdminNavbar.css";
const AdminNavbar = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="admin-navbar">
      <div className="nav">
        <h3 className="navbar-title">Admin Dashboard</h3>
      </div>
      <div className="dropdown">
        <button
          className="avatar-btn"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          <img
            className="avatar"
            src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png"
            // alt="Admin Avatar"
          />
        </button>
      </div>
      {openDropDown && (
        <div className="dropdown-menu">
          <Link to="profile" className="dropdown-item">
            Profile
          </Link>
          <button onClick={logout} className="dropdown-item">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
