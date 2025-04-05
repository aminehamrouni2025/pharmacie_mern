// controllers/messageController.js
const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;
  const sender = req.user.id;
  try {
    const newMessage = await Message.create({ sender, receiver, content });
    req.io.to(receiver.toString()).emit("newMessage", newMessage);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err });
  }
};

const User = require("../models/User"); // Import User model

const getConversationPartners = async (req, res) => {
  const userId = req.user.id;
  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const partnerIds = new Set();

    messages.forEach((msg) => {
      if (msg.sender.toString() !== userId)
        partnerIds.add(msg.sender.toString());
      if (msg.receiver.toString() !== userId)
        partnerIds.add(msg.receiver.toString());
    });

    // Fetch user info (e.g., fullName) for each partner
    const partners = await User.find({
      _id: { $in: Array.from(partnerIds) },
    }).select("_id fullName"); // Or whatever fields you want

    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: "Error getting partners", error: err });
  }
};


const getMessagesBetween = async (req, res) => {
  const userId = req.user.id;
  const partnerId = req.params.partnerId;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: partnerId },
        { sender: partnerId, receiver: userId },
      ],
    }).sort("timestamp");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error getting messages", error: err });
  }
};

module.exports = { sendMessage, getConversationPartners, getMessagesBetween };
