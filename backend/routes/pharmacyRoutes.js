const express = require("express");
const {
  createPharmacy,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/pharmacyController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

// Route: Pharmacist creates a pharmacy
router.post(
  "/create-pharmacy",
  verifyToken,
  checkRole(["pharmacist"]),
  createPharmacy
);
router.post(
  "/add-product",
  verifyToken,
  checkRole("pharmacist"),
  upload.single("image"),
  createProduct
);
router.put(
  "/update-product/:id",
  verifyToken,
  checkRole("pharmacist"),
  upload.single("image"),
  updateProduct
);
router.delete(
  "/delete-product/:id",
  verifyToken,
  checkRole("pharmacist"),
  deleteProduct
);
router.get("/product/:id", verifyToken, checkRole("pharmacist"), getProduct);
router.get(
  "/all-products",
  verifyToken,
  checkRole("pharmacist"),
  getAllProducts
);
module.exports = router;
