import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import { CiSearch } from "react-icons/ci"; // Import search icon

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/products",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [token]);

  // Function to format expiry date
  const formatExpiryDate = (expiry) => {
    if (!expiry || expiry.length !== 8) return "Invalid date";
    const day = expiry.substring(0, 2);
    const month = expiry.substring(2, 4);
    const year = expiry.substring(4, 8);
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return isNaN(formattedDate.getTime())
      ? "Invalid date"
      : formattedDate.toLocaleDateString();
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="all-products">
      <div className="product-title">
        <div className="input-search">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a product"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </div>
        <h2>All Products</h2>
      </div>
      <div>
        {currentProducts.length > 0 ? (
          <div className="product-container">
            {currentProducts.map((product) => (
              <div key={product._id} className="medicine-card">
                <img
                  className="medicine-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="medicine-info">
                  <h2 className="medicine-name">{product.name}</h2>
                  <p className="medicine-description">{product.description}</p>
                  <div className="medicine-details">
                    <span className="medicine-price">{product.price} TND</span>
                    <span className="medicine-expiry">
                      Expiry: {formatExpiryDate(product.expiry)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>No products found</h3>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
