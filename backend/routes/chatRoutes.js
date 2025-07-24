const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages between two users
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { currentUserId } = req.query;

  const messages = await Message.find({
    $or: [
      { senderId: currentUserId, receiverId: userId },
      { senderId: userId, receiverId: currentUserId }
    ]
  }).sort({ timestamp: 1 })
.populate('senderId', 'name avatar');
  res.json(messages);
});

module.exports = router;
