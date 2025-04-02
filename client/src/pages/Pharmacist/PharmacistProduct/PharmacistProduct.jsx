import React, { useState, useEffect } from "react";
import "./PharmacistProduct.css";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";

const PharmacistProduct = () => {
  const [products, setProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const [searchProduct, setSearchProduct] = useState("");
  const [productModal, setProductModal] = useState(false);

  const token = localStorage.getItem("token");

  const handleModal = () => {
    setProductModal(!productModal);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/pharmacies/all-products",
          {
            headers: { Authorization: token },
          }
        );
        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [token]);

  const handleEdit = (product) => {
    setEditProductData(product);
    setEditModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/pharmacies/delete-product/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="product-container">
      <div className="product-topbar">
        <div className="product-topbar-search">
          <CiSearch className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search for a product"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </div>
        <h2>All Products</h2>
        <div className="topbar-create">
          <button onClick={handleModal}>Create Product</button>
        </div>
      </div>

      <div className="product-content-bar">
        <table className="pharmacist-product__table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      className="product-img"
                      alt="Product"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.expiry
                      ? `${product.expiry.slice(0, 2)}/${product.expiry.slice(
                          2,
                          4
                        )}/${product.expiry.slice(4)}`
                      : "N/A"}
                  </td>

                  <td>
                    <button
                      className="table-button"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="table-button"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="product-content-title">
                  No Products found. Please start creating
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {productModal && (
        <CreateProduct
          setProductModal={setProductModal}
          setProducts={setProducts}
        />
      )}
      {editModal && (
        <EditProduct
          product={editProductData}
          setEditModal={setEditModal}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default PharmacistProduct;
