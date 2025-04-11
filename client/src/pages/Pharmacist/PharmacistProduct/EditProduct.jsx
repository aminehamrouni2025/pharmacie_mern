import React, { useState } from "react";
import axios from "axios";
import "./PharmacistProduct.css";

const EditProduct = ({ product, setEditModal, setProducts }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/pharmacies/update-product/${product._id}`,
        updatedProduct,
        {
          headers: { Authorization: token },
        }
      );
      setProducts((prev) =>
        prev.map((prod) =>
          prod._id === product._id ? response.data.data : prod
        )
      );
      setEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-modal-overlay">
      <div className="create-modal-content">
        <div className="create-modal-header">
          <h3>Edit Product</h3>
          <span
            className="create-close-icon"
            onClick={() => setEditModal(false)}
          >
            &times;
          </span>
        </div>
        <div className="create-modal-body">
      
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="category"
            value={updatedProduct.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            type="text"
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="number"
            name="stock"
            value={updatedProduct.stock}
            onChange={handleChange}
            placeholder="Stock"
          />
          <input
            type="text"
            name="expiry"
            value={updatedProduct.expiry}
            onChange={handleChange}
            placeholder="Expiry Date"
          />
          <input
            type="text"
            name="image"
            value={updatedProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <button className="create-submit-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
