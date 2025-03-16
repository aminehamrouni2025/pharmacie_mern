const express = require("express");
const router = express.Router();

const authController = require("../controllers/authControllers");

router.post("/create-user", authController.register);
router.post("/login", authController.login);

module.exports = router;
