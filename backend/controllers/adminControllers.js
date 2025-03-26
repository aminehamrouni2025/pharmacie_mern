const User = require("../models/User");
const Pharmacy = require("../models/Pharmacy");
const Supply = require("../models/Supply");
const CryptoJS = require("crypto-js");

// user CRUD for admin
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, role, address } = req.body;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins are allowed " });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ msg: "USer already exists!!!" });
    }
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.JWT_SECRET
    ).toString();
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "client",
      address: address || "your current address",
    });
    return res.status(201).json({
      status: "success",
      msg: "User created successfully!!!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).jsn({ msg: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, password, address, image } = req.body;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins are allowed " });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "User not found !!!" });
    }
    const imageUrl = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        password,
        address,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json({ msg: "User updated successfully!!", data: updatedUser });
  } catch (error) {
    return res.status(500).jsn({ msg: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins are alowed." });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }
    return res.status(201).json({ msg: "User found", data: user });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins are allowed " });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(201).json({ msg: "User deleted successfully !!!" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "You are not Allowed" });
    }
    const users = await User.find();
    return res.status(201).json({ msg: "All users ", data: users });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins are allowed " });
    }
    const totalUsers = await User.countDocuments();
    const totalPharmacies = await Pharmacy.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalSupplies = await Supply.countDocuments();
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalPharmacies,
        totalSupplies,
        totalProducts
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// get the admin credentials :
exports.getAdmin = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.user || req.user.role !== "admin") {
      return res.status(401).json({ msg: "Only Admins are allowed !!!" });
    }
    const admin = await User.findById(id);
    if (!admin) {
      return res.status(403).json({ msg: "Admin not found" });
    }
    return res.status(201).json({ msg: "Admin credentials", data: admin });
  } catch (error) {}
};

// update the admin credentials :
exports.updateAdmin = async (req, res) => {
  try {
    const { fullName, address, image, email } = req.body;

    // Ensure that only the authenticated admin can update their own profile
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admins are allowed" });
    }

    // Find the admin by ID (extracted from the token)
    const admin = await User.findById(req.user.id);
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found!" });
    }

    // Handle image update
    // const imageUrl = req.file.path
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    // Update the admin's profile
    const updatedAdmin = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName: fullName || admin.fullName,
        email: email || admin.email,
        address: address || admin.address,
        image: imageUrl || admin.image,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Admin updated successfully!", data: updatedAdmin });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
// ***************************
// supply routes

exports.getSupplies = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only Admins are Allowed" });
    }
    const supplies = await Supply.find();
    if (!supplies) {
      return res.status(300).json({ msg: "No Supplies requests foud!!" });
    }
    return res.status(201).json({ msg: "All Supplies", data: supplies });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.getSupply = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only Admins are Allowed" });
    }
    const supply = await Supply.findById(id);
    if (!supply) {
      return res.status(300).json({ msg: "No Supply request foud!!" });
    }
    return res.status(201).json({ msg: "supply found", data: supply });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.updateSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description } = req.body;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only Admins are Allowed" });
    }
    const supply = await Supply.findByIdAndUpdate(
      id,
      {
        status,
        description,
      },
      { new: true }
    );
    return res
      .status(201)
      .json({ msg: "Supply updated successfully", data: supply });
    if (!supply) {
      return res.status(300).json({ msg: "No Supply request foud!!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
