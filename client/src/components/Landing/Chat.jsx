import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chat.css";
import dayjs from "dayjs";

const Chat = ({ currentUser, receiverId, pharmacistName, socket }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (currentUser && receiverId) {
      axios
        .get(`http://localhost:5000/api/messages/conversation/${receiverId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => setMessages(res.data))
        .catch((err) => console.error(err));
    }
  }, [receiverId, currentUser]);

  useEffect(() => {
    if (!socket || !currentUser) return;

    socket.emit("join", currentUser);

    const handleNewMessage = (msg) => {
      if (
        (msg.sender === receiverId && msg.receiver === currentUser) ||
        (msg.sender === currentUser && msg.receiver === receiverId)
      ) {
        setMessages((prev) => [...prev, msg]);

        // Notification only for incoming messages
        if (msg.sender === receiverId && msg.receiver === currentUser) {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, currentUser, receiverId]);

  const sendMessage = async () => {
    if (!messageText) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        { receiver: receiverId, content: messageText },
        { headers: { Authorization: token } }
      );
      setMessages((prev) => [...prev, res.data]);
      setMessageText("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  return (
    <div className="chat-container">
      {showNotification && (
        <div className="notification">
          🔔 New message from {pharmacistName || "Pharmacist"}
        </div>
      )}
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${
              msg.sender === currentUser ? "sent" : "received"
            }`}
          >
            <p>{msg.content}</p>
            <small>{dayjs(msg.timestamp).format("HH:mm")}</small>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
