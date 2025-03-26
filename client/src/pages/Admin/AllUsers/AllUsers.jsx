import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import UpdateUser from "./UpdateUser";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);


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
useEffect(()=>{

})
  // console.log(users)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/delete-user/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
 
 const handleEdit = (user) => {
   setSelectedUser(user); // Set the user being updated
   setIsOpen(true);
 };
  
  return (
    <div className="all-users">
      <div className="users-title">
        <div>
          <div className="input-search">
            <h1>
              <CiSearch />
            </h1>

            <input type="text" placeholder="Search for a client" />
          </div>
        </div>
        <h2>All Users</h2>
        <div className="create-btn">
          <button onClick={() => alert("Functionnality yet to add")}>
            Create new client
          </button>
        </div>
      </div>
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
          {Array.isArray(users) ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img src={user.image} />
                </td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <h1> No USers Found</h1>
          )}
        </tbody>
      </table>
      {isOpen && (
        <UpdateUser
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={selectedUser} // Pass the user being updated
        
        />
      )}
    </div>
  );
};

export default AllUsers;
