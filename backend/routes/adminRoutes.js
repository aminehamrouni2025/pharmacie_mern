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
} = require("../controllers/adminControllers");

router.post("/create-user", verifyToken, checkRole("admin"), createUser);
router.post(
  "/update-user/:id",
  verifyToken,
  checkRole("admin"),
  upload.single("image"),
  updateUser
);
router.get("/user/:id", verifyToken, checkRole("admin"), getUser);
router.delete("/delete-user/:id", verifyToken, checkRole("admin"), deleteUser);

router.get("/users", verifyToken, checkRole("admin"), getAllUser);
router.get("/stats", verifyToken, checkRole("admin"), getStats);
module.exports = router;
