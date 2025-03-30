import React from "react";
import "./PharmaStats.css";
import { FaPills } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { CiPill } from "react-icons/ci";
import { MdOutlineEditCalendar } from "react-icons/md";

const iconSize = { width: "40px", height: "40px" };

const PharmaStats = () => {
  return (
    <div className="pharma_stats">
      <div className="pharma_card">
        <h3 className="pharma_total">Total Products</h3>
        <h3 className="pharma_total_number">00</h3>
        <div className="pharma_card_absolute">
          <h2 className="pharma_card_icon">
            <CiPill className="pharma_icon" style={iconSize} />
          </h2>
        </div>
      </div>
      <div className="pharma_card">
        <h3 className="pharma_total">Total Orders</h3>
        <h3 className="pharma_total_number">00</h3>
        <div className="pharma_card_absolute">
          <h2 className="pharma_card_icon">
            <FaCartShopping
              style={{
                width: "30px",
                height: "30px",
                textAlign: "center",
              }}
            />
          </h2>
        </div>
      </div>{" "}
      <div className="pharma_card">
        <h3 className="pharma_total">Total Supplies</h3>
        <h3 className="pharma_total_number">00</h3>
        <div className="pharma_card_absolute">
          <h2 className="pharma_card_icon">
            <MdOutlineEditCalendar
              style={{
                width: "50px",
                height: "50px",
              }}
            />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PharmaStats;
