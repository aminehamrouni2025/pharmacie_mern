import React, { useState, useEffect } from "react";
import "./PharmacistCharts.css";
import pharmacyLogo from "../../../assets/3.png";
import axios from "axios";
const PharmacistCharts = () => {
  const [pharmacy, setPharmacy] = useState(null);
  const [pharmacyData, setPharmacyData] = useState({
    name: "",
    address: "",
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const pharmacistId = localStorage.getItem("id");

  const handleChange = (e) => {
    setPharmacyData({ ...pharmacyData, [e.target.name]: e.target.value });
  };

  const fetchPharmacy = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pharmacies/pharmacy`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPharmacy(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setPharmacy(null); // No pharmacy found
      } else {
        setError("Error fetching pharmacy details");
      }
    }
  };
  const createPharmacy = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/pharmacies/create-pharmacy",
        pharmacyData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.pharmacy);
      setPharmacy(response.data.pharmacy);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPharmacy();
    // createPharmacy();
  }, [token]);

  return (
    <div className="pharmacist_charts">
      <div className="pharma-title">
        <h4>My Pharmacy Dashboard</h4>
      </div>
      <div className="charts-content">
        <div className="charts-image">
          <img src={pharmacyLogo} alt="pharma-logo" />
        </div>
        <div className="charts-create">
          {pharmacy ? (
            <div className="charts-create-info">
              <h2 className="text-xl font-bold">{pharmacy.name}</h2>
              <p>Address: {pharmacy.address}</p>
              <iframe
                className="pharmacies__map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  pharmacy.address
                )}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="create-info-btn">
                <button id="delete">Delete</button>
                <button id="edit">Edit</button>
              </div>
            </div>
          ) : (
            <div className="charts-create-inputs">
              <h3>Let's create a pharmacy</h3>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Enter address"
                name="address"
                onChange={handleChange}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={createPharmacy}
              >
                Create a Pharmacy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacistCharts;
