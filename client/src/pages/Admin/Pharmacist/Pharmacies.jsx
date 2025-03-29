import React, { useEffect, useState } from "react";
import "./Pharmacies.css";
import axios from "axios";
import { TbBuildingStore } from "react-icons/tb";
import { CiSearch } from "react-icons/ci"; // Import search icon

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchPharmacy, setSearchPharmacy] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const pharmaciesPerPage = 4; // 2 rows (2 per row)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPharmacies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/pharmacies",
          {
            headers: { Authorization: token },
          }
        );
        setPharmacies(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPharmacies();
  }, [token]);

  // Filter pharmacies before pagination
  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchPharmacy.toLowerCase())
  );

  // Pagination Logic (after filtering)
  const indexOfLastPharmacy = currentPage * pharmaciesPerPage;
  const indexOfFirstPharmacy = indexOfLastPharmacy - pharmaciesPerPage;
  const currentPharmacies = filteredPharmacies.slice(
    indexOfFirstPharmacy,
    indexOfLastPharmacy
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pharmacies">
      <div className="pharmacies__header">
        <div className="input-search">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a pharmacy"
            value={searchPharmacy}
            onChange={(e) => setSearchPharmacy(e.target.value)}
          />
        </div>
        <h2>All Pharmacies 🏥</h2>
      </div>

      <div className="pharmacies__grid">
        {currentPharmacies.length > 0 ? (
          currentPharmacies.map((pharmacy) => (
            <div key={pharmacy._id} className="pharmacies__card">
              <div className="pharmacies__card-header">
                <TbBuildingStore className="pharmacies__icon" />
                <h3>{pharmacy.name}</h3>
              </div>
              <p className="pharmacies__address">{pharmacy.address}</p>
              <iframe
                className="pharmacies__map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  pharmacy.address
                )}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ))
        ) : (
          <p className="pharmacies__no-data">No Pharmacies Found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pharmacies__pagination">
        {Array.from(
          { length: Math.ceil(filteredPharmacies.length / pharmaciesPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
              id="pharmacies-bt"
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pharmacies;
