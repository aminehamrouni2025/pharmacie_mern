import React, { useState } from "react";
import "./UpdateSupply.css";

const UpdateSupply = ({ supply, onSave, onCancel }) => {
  const [updatedDescription, setUpdatedDescription] = useState(
    supply.description
  );
  const [updatedStatus, setUpdatedStatus] = useState(supply.status);

  const handleSubmit = () => {
    onSave({
      ...supply,
      description: updatedDescription,
      status: updatedStatus,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Supply</h2>
        <label>Description:</label>
        <input
          type="text"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <label>Status:</label>
        <select
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="failed">Failed</option>
          <option value="delivered">Delivered</option>
        </select>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSupply;
