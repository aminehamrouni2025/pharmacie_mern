const User = require("../models/User");
const Product = require("../models/Product");
const Pharmacy = require("../models/Pharmacy");
const Order = require("../models/Order");
const mongoose = require("mongoose");

//  getting the products

exports.getProducts = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "client") {
      return res.status(401).json({ msg: " Only client are allowed" });
    }
    const products = await Product.find();
    return res.status(201).json({ msg: " All products", data: products });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!req.user || req.user.role !== "client") {
      return res.status(401).json({ msg: " Only client are allowed" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(201).json({ msg: "The product", data: product });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// get the pharmacies

exports.getPharmacies = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "client") {
      return res.status(401).json({ msg: " Only client are allowed" });
    }
    const pharmacies = await Pharmacy.find();
    return res.status(201).json({ msg: "All pharmacies", data: pharmacies });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getPharmacy = async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    if (!req.user || req.user.role !== "client") {
      return res.status(401).json({ msg: " Only client are allowed" });
    }

    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) {
      return res.status(404).json({ msg: "Pharmacy not found" });
    }
    return res.status(201).json({ msg: "The product", data: pharmacy });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// orders crud 
 exports.createOrder = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
 }
