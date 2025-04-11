const Pharmacy = require("../models/Pharmacy");
const Product = require("../models/Product");
const Supply = require("../models/Supply");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed !!!" });
    }
    const pharmacistProfile = await User.findById(id);
    if (!pharmacistProfile) {
      return res.status(404).json({ msg: "Something went wrong " });
    }
    return res.status(201).json({ msg: "My Profile", data: pharmacistProfile });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// exports.findPharmacy = async(req,res)=>{
// Backend: Check if pharmacist has a pharmacy
exports.getPharmacyByOwner = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const pharmacy = await Pharmacy.findOne({ owner: req.user.id });
    if (!pharmacy) {
      return res.status(404).json({ message: "No pharmacy found" });
    }

    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createPharmacy = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.user || req.user.role !== "pharmacist") {
      return res
        .status(403)
        .json({ message: "Only pharmacists can create a pharmacy" });
    }

    const { name, address } = req.body;

    // Check if the pharmacist already has a pharmacy
    const existingPharmacy = await Pharmacy.findOne({ owner: id });
    if (existingPharmacy) {
      return res
        .status(400)
        .json({ message: "Pharmacist already has a registered pharmacy" });
    }

    const newPharmacy = new Pharmacy({
      name,
      address,
      owner: id, // ✅ Fix: Make sure this is set properly
      inventory: [], // ✅ Fix: Ensures empty inventory by default
    });

    await newPharmacy.save();
    res.status(201).json({
      message: "Pharmacy created successfully",
      pharmacy: newPharmacy,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// create a product

exports.createProduct = async (req, res) => {
  try {
    const { id } = req.user;

    if (!req.user || req.user.role !== "pharmacist") {
      return res
        .status(401)
        .json({ msg: "Only pharmacists are allowed to create products." });
    }

    const {
      name,
      description,
      price,
      category,
      pharmacy,
      stock,
      image,
      expiry,
    } = req.body;

    // Ensure stock is non-negative
    if (stock < 0) {
      return res.status(400).json({ msg: "Stock cannot be negative." });
    }

    // Check if pharmacy exists
    const existingPharmacy = await Pharmacy.findOne({ owner: id });
    if (!existingPharmacy) {
      return res.status(404).json({ msg: "Pharmacy not found." });
    }

    // Check if product already exists in the same pharmacy
    const existingProduct = await Product.findOne({
      name,
      pharmacy: existingPharmacy._id,
    });
    if (existingProduct) {
      return res
        .status(403)
        .json({ msg: "Product already exists in this pharmacy!" });
    }

    // Handle image upload safely
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    // Create new product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pharmacy: existingPharmacy._id,
      stock,
      owner: id,
      image: imageUrl,
      expiry,
    });

    // Push the product into pharmacy inventory
    existingPharmacy.inventory.push({
      product: product._id,
      quantity: product.stock,
      name: product.name,
    });
    await existingPharmacy.save();

    // Populate the response with full product details
    const populatedProduct = await Product.findById(product._id)
      .populate("pharmacy", "name address")
      .populate("owner", "name email");

    return res.status(201).json({
      status: true,
      msg: "Product created and added to inventory successfully.",
      data: populatedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

// updating product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.user;

    if (!req.user || req.user.role !== "pharmacist") {
      return res
        .status(401)
        .json({ msg: "Only pharmacists can update products." });
    }

    const { name, description, price, category, stock, expiry } = req.body;
    const productId = req.params.id;
    console.log(productId);
    if (stock < 0) {
      return res.status(400).json({ msg: "Stock cannot be negative." });
    }

    const existingPharmacy = await Pharmacy.findOne({ owner: id });
    if (!existingPharmacy) {
      return res.status(404).json({ msg: "Pharmacy not found." });
    }

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        msg: "Product not found or does not belong to your pharmacy.",
      });
    }

    let imageUrl = product.image;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.image = imageUrl;
    product.expiry = expiry || product.expiry;

    await product.save();

    // ✅ Convert productId to ObjectId for accurate comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);

    console.log("Before inventory update:", existingPharmacy.inventory);

    // ✅ Find and remove the product if it exists
    const initialLength = existingPharmacy.inventory.length;

    existingPharmacy.inventory = existingPharmacy.inventory.filter(
      (item) => !item.product.equals(productObjectId) // Use `.equals()` to compare ObjectIds properly
    );

    if (existingPharmacy.inventory.length === initialLength) {
      console.log(`❌ Product ${productId} was NOT removed from inventory.`);
    } else {
      console.log(
        `✅ Product ${productId} removed successfully from inventory.`
      );
    }

    console.log("After removing old product:", existingPharmacy.inventory);

    // ✅ Now add the updated product entry
    existingPharmacy.inventory.push({
      product: productObjectId,
      quantity: stock,
      name: product.name,
    });

    console.log(`✅ New product entry added: ${productId} with stock ${stock}`);

    existingPharmacy.markModified("inventory"); // Ensure Mongoose detects changes
    await existingPharmacy.save();

    console.log("Final inventory state:", existingPharmacy.inventory);

    const updatedProduct = await Product.findById(product._id)
      .populate("pharmacy", "name address")
      .populate("owner", "name email");

    return res.status(200).json({
      status: true,
      msg: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Ensure only pharmacists can delete products
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only pharmacists are allowed!" });
    }

    // ✅ Find the product
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // ✅ Find the pharmacist's pharmacy
    const pharmacy = await Pharmacy.findOne({ owner: req.user.id });
    if (!pharmacy) {
      return res.status(404).json({ msg: "Pharmacy not found" });
    }

    // ✅ Remove the product from the pharmacy's inventory
    const initialLength = pharmacy.inventory.length;
    pharmacy.inventory = pharmacy.inventory.filter(
      (item) => !item.product.equals(new mongoose.Types.ObjectId(id))
    );

    if (pharmacy.inventory.length === initialLength) {
      console.log(`❌ Product ${id} was NOT found in inventory.`);
    } else {
      console.log(`✅ Product ${id} removed from inventory.`);
    }

    // ✅ Save the updated pharmacy without the deleted product
    await pharmacy.save();

    // ✅ Delete the product from the database
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Product deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed!!!" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(401).json({ msg: "Product not found !!!" });
    } else {
      return res.status(201).json({ msg: " My Product", data: product });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed!!!" });
    }
    const products = await Product.find({ owner: req.user.id }); // Filter products by the pharmacist's ID
    return res.status(201).json({ msg: " My Products", data: products });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// supply controllers

exports.createSupply = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed !!!" });
    }
    const { product, quantity, description } = req.body;
    const pharmacy = await Pharmacy.findOne({ owner: id });
    if (!pharmacy) {
      return res.status(404).json({ msg: "Pharmacy not found" });
    }
    const newSupply = await Supply.create({
      product,
      quantity,
      description,
      name: pharmacy ? pharmacy.name : "Unknown Pharmacy", // Ensure name is always set
      pharmacist: id,
    });
    return res
      .status(201)
      .json({ msg: "Supply send to admin successfully", data: newSupply });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
exports.getAllSupplies = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed !!!" });
    }

    const pharmacistId = req.user.id;

    // Fetch supplies created by the authenticated pharmacist
    const supplies = await Supply.find({ pharmacist: pharmacistId });

    if (!supplies || supplies.length === 0) {
      return res
        .status(404)
        .json({ msg: "No supplies found for this pharmacist." });
    }

    return res
      .status(200)
      .json({ msg: "Supplies retrieved successfully", data: supplies });
  } catch (error) {
    console.error("Error fetching supplies:", error);
    return res
      .status(500)
      .json({ msg: "Server error. Please try again later." });
  }
};

exports.getSupplyPharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacist are allowed!!!" });
    }
    const supplyPharmacy = await Supply.findById(id);
    return res
      .status(201)
      .json({ msg: "Consulting supply", data: supplyPharmacy });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getPharmacistStats = async (req, res) => {
  try {
    const { id } = req.user;

    // Ensure that the user is authenticated and is a pharmacist
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed !!!" });
    }

    // Count the number of products created by the pharmacist
    const productCount = await Product.countDocuments({ owner: id });

    // Count the number of supplies created by the pharmacist
    const supplyCount = await Supply.countDocuments({ pharmacist: id });

    return res.status(200).json({
      msg: "Pharmacist stats retrieved successfully",
      data: {
        productCount,
        supplyCount,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
