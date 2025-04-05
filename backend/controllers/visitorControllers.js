const Product = require("../models/Product");
const Pharmacy = require("../models/Pharmacy");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(403).json({ msg: "No products found ." });
    }
    return res.status(201).json({ msg: "All products", data: products });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    if (!pharmacies) {
      return res.status(403).json({ msg: "No pharmacies found ." });
    }
    return res.status(201).json({ msg: "All pharmacies", data: pharmacies });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};


