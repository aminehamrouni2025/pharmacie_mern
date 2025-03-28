import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Product.css";
const Product = () => {
  const [products, setProducts] = useState([]);
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
        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [token]);
  // Function to format expiry date
  const formatExpiryDate = (expiry) => {
    if (!expiry || expiry.length !== 8) return "Invalid date"; // Handle errors

    const day = expiry.substring(0, 2);
    const month = expiry.substring(2, 4);
    const year = expiry.substring(4, 8);

    const formattedDate = new Date(`${year}-${month}-${day}`); // Convert to Date object

    return isNaN(formattedDate.getTime())
      ? "Invalid date"
      : formattedDate.toLocaleDateString(); // Display in readable format
  };

  return (
    <div className="all-products">
      <div className="product-title">
        <h2>All Products</h2>
      </div>
      <div>
        {Array.isArray(products) ? (
          <div className="product-container">
            {products.map((product) => (
              <div key={product._id}>
                <div className="medicine-card">
                  <img
                    className="medicine-image"
                    src={product.image}
                    alt={name}
                  />
                  <div className="medicine-info">
                    <h2 className="medicine-name">{product.name}</h2>
                    {/* <p className="pharmacy-name">
                      Pharmacy: {product.pharmacy?.name}
                    </p> */}
                    <p className="medicine-description">
                      {product.description}
                    </p>
                    <div className="medicine-details">
                      <span className="medicine-price">
                        {product.price} TND
                      </span>
                      <span className="medicine-expiry">
                        Expiry: {formatExpiryDate(product.expiry)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    </div>
  );
};

export default Product;
