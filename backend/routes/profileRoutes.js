const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getEntrepreneurs, getInvestors } = require('../controllers/profileController');
const  { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// GET profile by ID
router.get('/:id', verifyToken, getProfile);

// PUT update own profile
router.put('/update', verifyToken, updateProfile);

// GET all entrepreneurs
router.get('/role/entrepreneurs', verifyToken, getEntrepreneurs);

// GET all investors
router.get('/role/investors', verifyToken, getInvestors);

// POST upload pitch deck
router.post('/pitchdeck', verifyToken, upload.single('pitchDeck'), async (req, res) => {
  try {
    if (req.user.role !== 'Entrepreneur') {
      return res.status(403).json({ message: 'Only entrepreneurs can upload pitch decks' });
    }

    const user = await User.findById(req.user.id);
    user.pitchDeckUrl = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Pitch deck uploaded', pitchDeckUrl: user.pitchDeckUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload pitch deck' });
  }
});
// GET profile of logged-in user (uses token only)
router.get('/me', verifyToken, async (req, res) => {
  try {
    console.log('Decoded token payload:', req.user);

    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
