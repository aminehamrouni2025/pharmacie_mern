import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
 

const CreateSupply = ({ setSupplyModal, newSupply, setNewSupply }) => {
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/pharmacies/create-supply",
        newSupply,
        {
          headers: {
            Authorization: token, // Fix token format
            "Content-Type": "application/json", // Fix Content-Type
          },
        }
      );
      console.log(response);
    

      // Update state correctly without overwriting everything
      setNewSupply({ ...newSupply, ...response.data.data });

      setSupplyModal(false); // Close modal after success
    } catch (error) {
      console.error("Error creating supply:", error.response?.data || error);
    }
  };

  return (
    <div className="create-modal-overlay">
      
      <div className="create-modal-content">
        <div className="create-modal-header">
          <h2>Create Supply</h2>
          <AiOutlineClose
            className="create-close-icon"
            onClick={() => setSupplyModal(false)}
          />
        </div>
        <form className="create-modal-body" onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Product"
            value={newSupply.product || ""}
            onChange={(e) =>
              setNewSupply((prev) => ({ ...prev, product: e.target.value }))
            }
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newSupply.description || ""}
            onChange={(e) =>
              setNewSupply((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newSupply.quantity || ""}
            onChange={(e) =>
              setNewSupply((prev) => ({ ...prev, quantity: e.target.value }))
            }
          />

          <button type="submit" className="create-submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSupply;
