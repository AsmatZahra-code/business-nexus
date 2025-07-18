const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust if path differs

// GET /api/users?role=Entrepreneur
router.get('/', async (req, res) => {
  try {
    const role = req.query.role;

    const filter = role ? { role: new RegExp(`^${role}$`, 'i') } : {};
    const users = await User.find(filter).select('name startup pitch role');

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

module.exports = router;
