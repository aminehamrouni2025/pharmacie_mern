const jwt = require("jsonwebtoken");
require('dotenv').config()
const verifyToken = async(req, res, next) => {
  const token = await req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
