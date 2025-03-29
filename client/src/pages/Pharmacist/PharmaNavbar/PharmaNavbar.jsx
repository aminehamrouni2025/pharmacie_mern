import React from "react";
import "./PharmaNavbar.css";
import { FaHouseUser } from "react-icons/fa";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

const PharmaNavbar = () => {
  return (
    <div className="pharma__navbar">
      <div className="pharmacist-navbar">
        <h1>
          <FaHouseUser />
        </h1>
        <h2>/Dashboard</h2>
      </div>
      <div className="pharmacy-btn ">
        <button>
          <h3>
            <BsFillFileEarmarkPersonFill />
          </h3>
        </button>
        <button>
          <h3>
            <IoSettings />
          </h3>
        </button>
        <button>
          <h3>
            <IoIosNotifications />
          </h3>
        </button>
      </div>
    </div>
  );
};

export default PharmaNavbar;
