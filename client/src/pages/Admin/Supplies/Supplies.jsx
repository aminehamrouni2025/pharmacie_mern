import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateSupply from "./UpdateSupply";
import "./Supplies.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
        // Ensure every supply object has a 'name' property

        console.log("Full API Response: ", response); // Log full response
        console.log("Supplies Data: ", response.data); // Log response body
        console.log("Extracted Supplies: ", response.data.data); // Log expected array

        // Ensure we are setting state with an array
        setSupplies(
          Array.isArray(response.data.data) ? [...response.data.data] : []
        );
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
      setSupplies((prevSupplies) =>
        prevSupplies.map((supply) =>
          supply._id === updatedSupply._id ? response.data.data : supply
        )
      );
      setEditingSupply(null);
    } catch (error) {
      console.log(error);
    }
  };

 const generateInvoice = (supply) => {
   const doc = new jsPDF();

   // Theme Colors
   const primaryColor = "#003e26"; // PharmaConnect theme color
   const textColor = "#ffffff"; // White text on dark background

   // Header Section
   doc.setFillColor(primaryColor);
   doc.rect(0, 0, 210, 40, "F"); // Full-width header
   doc.setTextColor(textColor);
   doc.setFontSize(22);
   doc.text("PharmaConnect", 14, 15);
   doc.setFontSize(14);
   doc.text("Supply Invoice", 14, 25);

   // Invoice Information
   doc.setTextColor("#000000"); // Black text
   doc.setFontSize(12);
   doc.text(
     `Date: ${new Date(supply.updatedAt).toLocaleDateString()}`,
     150,
     30
   );

   // Pharmacy Info
   doc.setFontSize(14);
   doc.text(`Pharmacy Name: ${supply.name}`, 14, 50);

   // Check if autoTable is properly loaded
   if (typeof autoTable === "function") {
     autoTable(doc, {
       startY: 60,
       head: [["Product", "Quantity", "Description", "Status"]],
       body: [
         [supply.product, supply.quantity, supply.description, supply.status],
       ],
       theme: "striped",
       styles: { fontSize: 12 },
       headStyles: { fillColor: primaryColor, textColor: textColor },
     });
   } else {
     console.error("autoTable is not available!");
   }

   // Footer
   doc.setFillColor(primaryColor);
   doc.rect(0, doc.internal.pageSize.height - 20, 210, 20, "F");
   doc.setTextColor(textColor);
   doc.text(
     "Thank you for using PharmaConnect!",
     14,
     doc.internal.pageSize.height - 10
   );

   // Save the file
   doc.save(`Invoice_${supply.name}.pdf`);
 };

  return (
    <div className="supply-page">
      <div className="supply-title">
        <h2>All Supplies</h2>
      </div>
      <div className="supply-content">
        <table className="supply-table">
          <thead className="supply-head">
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
            {supplies.map((supply) => (
              <tr key={supply._id || Math.random()}>
                <td>{supply?.name}</td>
                <td>{supply?.product}</td>
                <td>{supply?.quantity}</td>
                <td>{supply?.description}</td>
                <td>{supply?.status}</td>
                <td>
                  {supply.status === "delivered" ? (
                    <button onClick={() => generateInvoice(supply)}>
                      📄 Download Invoice
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(supply)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
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

export default Supplies
