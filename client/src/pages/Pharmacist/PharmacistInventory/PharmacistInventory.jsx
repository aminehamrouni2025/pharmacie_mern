import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./PharmacistInventory.css";
import pharmacyImg from '../../../assets/1.png'
const PharmacistInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Inventory Data
  const fetchPharmacy = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pharmacies/pharmacy`,
        {
          headers: { Authorization: token },
        }
      );
      setInventory(response.data.inventory || []);
    } catch (err) {
      setError("Error fetching pharmacy inventory.");
    }
  };

  useEffect(() => {
    fetchPharmacy();
  }, [token]);

  // Function to Download Inventory as Excel File
  const downloadExcel = () => {
    if (inventory.length === 0) return;

    // Convert JSON to Worksheet
    const worksheet = XLSX.utils.json_to_sheet([
      { Name: "Pharma Connect - Inventory Report", Quantity: "" },
      {},
      ...inventory.map((item) => ({
        Name: item.name,
        Quantity: item.quantity,
      })),
    ]);

    // Create a new Workbook & Add the Worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    // Apply Column Widths for Better Readability
    const wscols = [{ wch: 30 }, { wch: 15 }];
    worksheet["!cols"] = wscols;

    // Export File with Custom Name
    XLSX.writeFile(workbook, "Pharma_Connect_Inventory.xlsx");
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">📦 Pharma Connect - Inventory</h2>
      <div className="inventory-content">
        <div>
          <img src={pharmacyImg} />
        </div>
        <div>
          {error && <p className="error-message">{error}</p>}

          {inventory.length > 0 ? (
            <>
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>📝 Name</th>
                    <th>📦 Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="download-btn" onClick={downloadExcel}>
                📥 Download Excel
              </button>
            </>
          ) : (
            <p className="no-inventory">⚠️ No inventory available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacistInventory;
