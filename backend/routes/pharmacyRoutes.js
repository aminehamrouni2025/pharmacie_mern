const express = require("express");
const {
  createPharmacy,
  addProductToInventory,
} = require("../controllers/pharmacyController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route: Pharmacist creates a pharmacy
router.post("/create-pharmacy", verifyToken, checkRole(["pharmacist"]), createPharmacy);
router.post(
  "/add-product",
  verifyToken,
  checkRole("pharmacist"),
  addProductToInventory
);


module.exports = router;

