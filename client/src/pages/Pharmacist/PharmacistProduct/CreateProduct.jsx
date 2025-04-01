import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const CreateProduct = ({
  setProductData,
  productData,
  setProductModal,
  setProducts,
}) => {
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pharmacies/add-product",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );

      toast.success("✅ Product Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Update the product list without reloading
      setProducts((prevProducts) => [...prevProducts, response.data.data]);

      setProductModal(false);
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      toast.error("❌ Failed to create product", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="create-modal-overlay">
      <div className="create-modal-content">
        <div className="create-modal-header">
          <h2>Create Product</h2>
          <AiOutlineClose
            className="create-close-icon"
            onClick={() => setProductModal(false)}
          />
        </div>
        <form className="create-modal-body" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={(e) =>
              setProductData({ ...productData, stock: e.target.value })
            }
          />
          <input
            type="text"
            name="expiry"
            placeholder="Expiry Date"
            onChange={(e) =>
              setProductData({ ...productData, expiry: e.target.value })
            }
          />
          <select
            className="create-input-field"
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            name="category"
          >
            <option value="">Category</option>
            <option value="medicine">Medicine</option>
            <option value="equipment">Equipment</option>
            <option value="supplement">Supplement</option>
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit" className="create-submit-btn">
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateProduct;
