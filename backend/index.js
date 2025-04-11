const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const http = require("http"); // ✅ Needed to create the server
const socketIo = require("socket.io");

require("dotenv").config();
const cors = require("cors");

// Create HTTP server manually
const server = http.createServer(app); // ✅ Define server BEFORE using it in socketIo

const io = socketIo(server, {
  cors: {
    origin: "*", // update to match frontend origin
    methods: ["GET", "POST"],
  },
});

// importing global variables
const port = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const authRoutes = require("./routes/authRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const clientRoutes = require('./routes/clientRoutes')

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite frontend
    credentials: true, // If using cookies or authentication headers
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

// Socket.io middleware for route access
app.use((req, res, next) => {
  req.io = io;
  next();
});

// routes
app.use("/api/users/", authRoutes);
app.use("/api/pharmacies/", pharmacyRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/visitors", visitorRoutes);
app.use('./api/client' , clientRoutes)

// Database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err));
// Socket.io Setup
io.on("connection", (socket) => {
  console.log("🔵 User connected: " + socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`✅ User ${userId} joined room ${userId}`);
  });

  socket.on("sendMessage", (msg) => {
    io.to(msg.receiver).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected: " + socket.id);
  });
});

// launching the server
server.listen(port, () => {
  console.log(`🚀 Server is running on port :${port}`);
});
