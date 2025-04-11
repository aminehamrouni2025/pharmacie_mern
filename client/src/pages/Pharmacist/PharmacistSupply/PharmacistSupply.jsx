import React, { useState, useEffect } from "react";
import "./PharmacistSupply.css";
import CreateSupply from "./CreateSupply";
import axios from "axios";

const PharmacistSupply = () => {
  const [newSupply, setNewSupply] = useState({
    product: "",
    quantity: 0,
    description: "",
  });

  const [supplyModal, setSupplyModal] = useState(false);
  const [allSupplies, setAllSupplies] = useState([]);
  const token = localStorage.getItem("token");

  const handleSupplyModal = () => {
    setSupplyModal(true);
  };

  const fetchSupplies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacies/supplies",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setAllSupplies(response.data.data); // Set fetched supplies
    } catch (error) {
      console.error("Error fetching supplies:", error);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  // Function to determine color based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "accepted":
        return "status-accepted";
      case "not accepted":
        return "status-not-accepted";
      case "delivered":
        return "status-delivered";
      default:
        return "";
    }
  };

  return (
    <div className="supply-pharmacy">
      <div className="supply-pharmacy-title">
        <h3>All Supplies</h3>
        <button onClick={handleSupplyModal}>Create new supply</button>
      </div>

      {/* Supplies Table */}
      <table className="supply-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allSupplies.length > 0 ? (
            allSupplies.map((supply) => (
              <tr key={supply._id}>
                <td>{supply.product}</td>
                <td>{supply.description}</td>
                <td>{supply.quantity}</td>
                <td className={getStatusClass(supply.status)}>
                  {supply.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No supplies found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Create Supply Modal */}
      {supplyModal && (
        <CreateSupply
          setSupplyModal={setSupplyModal}
          newSupply={newSupply}
          setNewSupply={setNewSupply}
        />
      )}
    </div>
  );
};

export default PharmacistSupply;
