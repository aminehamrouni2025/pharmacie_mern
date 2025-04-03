const express = require("express");
const {
  createPharmacy,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  createSupply,
  getSupplyPharmacy,
  getProfile,
  getPharmacyByOwner,
  getAllSupplies,
  getPharmacistStats,
} = require("../controllers/pharmacyController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

// Route: Pharmacist creates a pharmacy
router.post(
  "/create-pharmacy",
  verifyToken,
  checkRole("pharmacist"),
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
router.post(
  "/create-supply",
  verifyToken,
  checkRole("pharmacist"),
  createSupply
);
router.get(
  "/supply/:id",
  verifyToken,
  checkRole("pharmacist"),
  getSupplyPharmacy
);
router.get(
  "/pharmacy",
  verifyToken,
  checkRole("pharmacist"),
  getPharmacyByOwner
);
router.get("/profile/:id", verifyToken, checkRole("pharmacist"), getProfile);
router.get("/supplies", verifyToken, checkRole("pharmacist"), getAllSupplies);
router.get("/stats", verifyToken, checkRole("pharmacist"), getPharmacistStats);
module.exports = router;
