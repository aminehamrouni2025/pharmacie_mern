const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["medicine", "equipment", "supplement"], // Example categories
    required: true,
  },
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
  },
}, {timestamps:true});

module.exports = Product = mongoose.model("Product", ProductSchema);
