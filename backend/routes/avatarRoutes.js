// routes/avatar.js
const express = require('express');
const router = express.Router();
const uploadAvatar = require('../middlewares/uploadAvatar');
const { verifyToken } = require('../middlewares/authMiddleware');

const User = require('../models/User');

router.post('/avatar', verifyToken, uploadAvatar.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.id);
    user.avatar = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Avatar uploaded', avatar: user.avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
});

module.exports = router;
