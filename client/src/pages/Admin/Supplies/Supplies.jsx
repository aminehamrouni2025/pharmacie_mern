import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateSupply from "./UpdateSupply";
import "./Supplies.css";

const Supplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [editingSupply, setEditingSupply] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getSupplies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/all-supplies",
          {
            headers: { Authorization: token },
          }
        );
        setSupplies(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSupplies();
  }, [token]);

  const handleEdit = (supply) => {
    setEditingSupply(supply);
  };

  const handleSave = async (updatedSupply) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-supply/${updatedSupply._id}`,
        {
          description: updatedSupply.description,
          status: updatedSupply.status,
        },
        { headers: { Authorization: token } }
      );
      setSupplies(
        supplies.map((supply) =>
          supply._id === updatedSupply._id
            ? response.data.updatedSupply
            : supply
        )
      );
      setEditingSupply(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="supply-page">
      <div className="supply-title">
        <h2>All Supplies</h2>
      </div>
      <div className="supply-content">
        <table className="supply-table">
          <thead>
            <tr>
              <th>Pharmacy</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(supplies) && supplies.length > 0 ? (
              supplies.map((supply) => (
                <tr key={supply._id}>
                  <td>{supply.name}</td>
                  <td>{supply.product}</td>
                  <td>{supply.quantity}</td>
                  <td>{supply.description}</td>
                  <td>{supply.status}</td>
                  <td>
                    <button onClick={() => handleEdit(supply)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Supplies Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingSupply && (
        <UpdateSupply
          supply={editingSupply}
          onSave={handleSave}
          onCancel={() => setEditingSupply(null)}
        />
      )}
    </div>
  );
};

export default Supplies;
