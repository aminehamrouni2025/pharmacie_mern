const User = require("../models/User");
const Pharmacy = require("../models/Pharmacy");
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
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalPharmacies,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
