const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
// register user
exports.register = async (req, res) => {
  const { fullName, email, password, role, address } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ msg: "User already exists, try to login!" });
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
      msg: "User created , Please login.",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "user not found, please create an account!" });
    }
    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SECRET
    ).toString(CryptoJS.enc.Utf8);
    if (password !== originalPassword) {
      return res.status(403).json({ msg: "Email or password are wrong !" });
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      return res.status(200).json({ message: "Login successful", token , role: user.role });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
