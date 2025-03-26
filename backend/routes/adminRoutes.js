const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getAllUser,
  getStats,
  updateAdmin,
  getAdmin,
  getSupplies,
  getSupply,
  updateSupply,
} = require("../controllers/adminControllers");

router.post("/create-user", verifyToken, checkRole("admin"), createUser);
router.put(
  "/update-user/:id",
  verifyToken,
  checkRole("admin"),
  upload.single("image"),
  updateUser
);
router.put(
  "/update-admin/:id",
  verifyToken,
  checkRole("admin"),
  upload.single("image"),
  updateAdmin
);
router.get("/user/:id", verifyToken, checkRole("admin"), getUser);
router.get("/profile/:id", verifyToken, checkRole("admin"), getAdmin);
router.delete("/delete-user/:id", verifyToken, checkRole("admin"), deleteUser);

router.get("/users", verifyToken, checkRole("admin"), getAllUser);
router.get("/stats", verifyToken, checkRole("admin"), getStats);
router.get("/all-supplies", verifyToken, checkRole("admin"), getSupplies);
router.get("/supply/:id", verifyToken, checkRole("admin"), getSupply);
router.get("/update-supply/:id", verifyToken, checkRole("admin"), updateSupply);
module.exports = router;
