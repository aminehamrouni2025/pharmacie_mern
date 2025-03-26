import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import axios from "axios";
const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUsers(response.data.data);
      } catch (error) {
        console.error("Error getting users :", error);
      }
    };
    if (token) getUsers();
  }, [token]);

  // console.log(users)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
        });
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const clients = Array.isArray(users)
    ? users.filter((user) => user.role == "client")
    : [];
  console.log(clients);

  return (
    <div className="all-users">
      <h2>All Users</h2>
      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((user) => (
            <tr key={user._id}>
              <td>
                <img src={user.image} />
              </td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() =>
                    alert("Edit functionality not implemented yet")
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
