import React, { useEffect, useState } from "react";
import "./Pharmacies.css";
import axios from "axios";
import { TbBuildingStore } from "react-icons/tb";
import pharmaCard from "../../../assets/pharmacy-card.png";

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPharmacies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/pharmacies",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // setPharmacies(response.data);
        console.log(response.data.data);
        console.log(response.data.msg);
        setPharmacies(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPharmacies();
  }, [token]);

  return (
    <div className="pharmacies-page">
      <h2>All Pharmacies 🏢</h2>
      <div className="cards-container">
        {Array.isArray(pharmacies) ? (
          pharmacies.map((pharmacy) => (
            <div key={pharmacy._id} className="pharmacy-card">
              <div className="pharmacy-title">
                <h3>
                  <TbBuildingStore />
                </h3>
                <h3>{pharmacy.name}</h3>
              </div>
              <img src={pharmaCard} alt="pharma-card" />

              <h3>{pharmacy.address}</h3>
              <iframe
                width="100%"
                height="90%"
                className="map-container-pharmacy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  pharmacy.address
                )}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Pharmacies;
