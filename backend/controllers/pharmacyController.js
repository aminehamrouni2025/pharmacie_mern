const Pharmacy = require("../models/Pharmacy");
const Product = require("../models/Product");
const User = require("../models/User");

const upload = require("../middlewares/upload");

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
        .json({ msg: " Only pharmacist are allowed to create product" });
    }
    const {
      name,
      description,
      price,
      category,
      pharmacy,
      stock,
      owner,
      image,
    } = req.body;
    // checking if product exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(403).json({ msg: "Product already exists!!!" });
    }
    const imageUrl = req.file.path;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      pharmacy,
      stock,
      owner: id,
      image: imageUrl,
    });
    return res.status(201).json({
      status: true,
      msg: " Product Created Successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// updating product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, image } = req.body;
    if (!req.user || req.user.role !== "pharmacist") {
      return res
        .status(401)
        .json({ msg: " Only pharmacist are allowed to create product" });
    }
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const imageUrl = req.file.path;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        stock,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json({ msg: "Product updated successfully!!!", data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "pharmacist") {
      return res.json({ msg: "Only pharmacist are allowed !!!" });
    }
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    return res.status(201).json({ msg: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Only Pharmacists are allowed!!!" });
    }
    const product = await Product.findById(id);
    if(!product){
      return res.status(401).json({msg: "Product not found !!!"})
    }
    else {
    return res.status(201).json({ msg: " My Product", data: product });

    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
       if (!req.user || req.user.role !== "pharmacist") {
         return res
           .status(403)
           .json({ msg: "Only Pharmacists are allowed!!!" });
       }
       const products = await Product.find();
       return res.status(201).json({ msg: " My Products", data: products });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
