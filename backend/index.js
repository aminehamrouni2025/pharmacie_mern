const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// importing global variables
const port = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const authRoutes = require('./routes/authRoutes')
const pharmacyRoutes = require('./routes/pharmacyRoutes')
// middlewares
app.use(express.json());

// routes
app.use('/api/users/', authRoutes)
app.use("/api/pharmacies/", pharmacyRoutes);
// Database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// lunching the server

app.listen(port, () => {
  console.log(`Server is running on port :${port}`);
});
