import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import { ToastContainer, toast } from "react-toastify";


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    address: "",
  });
  const [newUserModal, setNewUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users per page
  const token = localStorage.getItem("token");

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
  useEffect(() => {
    if (token) getUsers();
  }, [token]);
  useEffect(() => {});
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
  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);
  return (
    <div className="all-users">
      <ToastContainer />

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
          <button onClick={() => setNewUserModal(!newUserModal)}>
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
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
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
      {/* Pagination Controls */}
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
      {isOpen && (
        <UpdateUser
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={selectedUser} // Pass the user being updated
          getUsers={getUsers}
        />
      )}
      {newUserModal ? (
        <CreateUser
          newUser={newUser}
          setNewUser={setNewUser}
          newUserModal={newUserModal}
          setNewUserModal={setNewUserModal}
          getUsers={getUsers}
        />
      ) : null}
    </div>
  );
};

export default AllUsers;
