// routes/messageRoutes.js
// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const { sendMessage, getConversationPartners, getMessagesBetween } = require("../controllers/messageController");
const {verifyToken} = require("../middlewares/authMiddleware");

router.post("/", verifyToken, sendMessage);
router.get("/conversations", verifyToken, getConversationPartners);
router.get("/conversation/:partnerId", verifyToken, getMessagesBetween);

module.exports = router;
