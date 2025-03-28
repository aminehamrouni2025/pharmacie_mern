const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema(
  {
    pharmacist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the pharmacist making the request
      required: true,
    },
    product: {
      type: String, // Name of the product
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure at least 1 item is requested
    },
    description : {
        type : String,
        required : true,
        default:""
    },
    status: {
      type: String,
      enum: ["pending","accepted","not accepted", "delivered"],
      default: "pending", // Default status when request is created
    },
    name : {
      type : String
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Supply", supplySchema);
