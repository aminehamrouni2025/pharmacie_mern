import React, { useState, useEffect } from "react";
import "./PharmacistProduct.css";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import CreateProduct from "./CreateProduct";

const PharmacistProduct = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    expiry: "",
    image: "",
  });
   const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4; // Number of products per page
  const [productModal, setProductModal] = useState(false);
    const [searchProduct, setSearchProduct] = useState(""); // Search state
  
  const token = localStorage.getItem("token");
  // Get all products
  const handleModal = () => {
    setProductModal(!productModal);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/pharmacies/all-products",
          {
            headers: {
              Authorization: token,
            },
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
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstUser = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstUser, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-container">
      <div className="product-topbar">
        {/* search field */}

        <div className="product-topbar-search">
          <CiSearch className="topbar-search-icon" />
          <input type="text" placeholder="Search for a product" />
        </div>
        <h2>All Products</h2>
        {/* create field */}
        <div className="topbar-create">
          <button onClick={handleModal}>Create Product</button>
        </div>
      </div>
      <div className="product-content-bar">
        <table
          border="1"
          cellPadding="5"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
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
            {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} />
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
                      // onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="table-button"
                      // onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="product-content-title">
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
      {productModal ? (
        <CreateProduct
          setProductData={setProductData}
          productData={productData}
          setProductModal={setProductModal}
          setProducts={setProducts} // Pass the function
        />
      ) : null}
    </div>
  );
};

export default PharmacistProduct;
