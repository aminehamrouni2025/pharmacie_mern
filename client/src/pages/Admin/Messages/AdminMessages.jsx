// pages/Admin/AdminMessages.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../../../components/Landing/Chat";
import { io } from "socket.io-client";

// Initialize socket outside component to prevent multiple connections
const socket = io("http://localhost:5000"); // Replace with your backend URL if different

const AdminMessages = () => {
  const currentUser = localStorage.getItem("id");
  const fullName = localStorage.getItem("fullName");

  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch conversation partners
    axios
      .get("http://localhost:5000/api/messages/conversations", {
        headers: { Authorization: token },
      })
      .then((res) => setPharmacists(res.data))
      .catch((err) => console.error(err));

    // Join current user to socket room
    socket.emit("join", currentUser);

    // Listen for incoming messages
    socket.on("newMessage", (msg) => {
      console.log("💬 New message received:", msg);
      notifyNewMessage(msg.sender);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const notifyNewMessage = (senderId) => {
    if (selectedPharmacist?._id !== senderId) {
      setNewMessages((prev) =>
        prev.includes(senderId) ? prev : [...prev, senderId]
      );
    }
  };

  const handleSelectPharmacist = (pharmacist) => {
    setSelectedPharmacist(pharmacist);
    setNewMessages((prev) => prev.filter((id) => id !== pharmacist._id));
  };

  return (
    <div style={{ display: "flex" ,backgroundColor :"#fff" }}>
      <div
        style={{ width: "30%", borderRight: "1px solid gray", padding: "1rem" }}
      >
        <h4 style={{
          color:"#003e26"
        }}>Conversations</h4>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {pharmacists.map((pharmacist) => (
            <li
              key={pharmacist._id}
              onClick={() => handleSelectPharmacist(pharmacist)}
              style={{
                cursor: "pointer",
                marginBottom: "0.5rem",
                fontWeight: newMessages.includes(pharmacist._id)
                  ? "bold"
                  : "normal",
                color: newMessages.includes(pharmacist._id) ? "red" : "inherit",
              }}
            >
              Pharmacist: {pharmacist.fullName}{" "}
              {newMessages.includes(pharmacist._id) && "🔔"}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: "1rem" }}>
        {selectedPharmacist ? (
          <Chat
            currentUser={currentUser}
            receiverId={selectedPharmacist._id}
            receiverName={selectedPharmacist.fullName}
            socket={socket}
          />
        ) : (
          <p>Select a conversation</p>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
