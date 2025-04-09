import React from "react";
import "./ClientSidebar.css";

const ClientSidebar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["medicine", "supplement", "equipment"];

  return (
    <div className="client-sidebar">
      <h3>Catégories</h3>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSidebar;
