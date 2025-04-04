import Chat from "../../../components/Landing/Chat";
// pages/Admin/AdminMessages.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMessages = () => {
  const currentUser = localStorage.getItem("id");
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/messages/conversations", {
        headers: { Authorization: token },
      })
      .then((res) => setPharmacists(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.log(pharmacists);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "30%", borderRight: "1px solid gray" }}>
        <h4>Conversations</h4>
        <ul>
          {pharmacists.map((id) => (
            <li
              key={id}
              onClick={() => setSelectedPharmacist(id)}
              style={{ cursor: "pointer" }}
            >
              Pharmacist: {id}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        {selectedPharmacist ? (
          <Chat currentUser={currentUser} receiverId={selectedPharmacist} />
        ) : (
          <p>Select a conversation</p>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
