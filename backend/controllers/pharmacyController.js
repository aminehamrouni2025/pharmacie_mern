const Pharmacy = require("../models/Pharmacy");
const Product = require("../models/Product");
const User = require("../models/User");

exports.addProductToInventory = async (req, res) => {
  try {
    const { pharmacyId, productId, quantity } = req.body;
    const {id}= req.user._id

    // Ensure user is a pharmacist
    if (req.user.role !== "pharmacist") {
      return res
        .status(403)
        .json({ message: "Only pharmacists can manage inventory." });
    }

    // Find pharmacy
    const pharmacy = await Pharmacy.findOne({
      _id: pharmacyId,
      owner:id,
    });
    if (!pharmacy) {
      return res
        .status(404)
        .json({ message: "Pharmacy not found or not owned by you." });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update inventory
    const existingProductIndex = pharmacy.inventory.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      pharmacy.inventory[existingProductIndex].quantity += quantity;
    } else {
      pharmacy.inventory.push({ product: productId, quantity });
    }

    await pharmacy.save();
    res
      .status(200)
      .json({ message: "Product added to inventory successfully", pharmacy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// *******************

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
    const existingPharmacy = await Pharmacy.findOne({owner : id});
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
