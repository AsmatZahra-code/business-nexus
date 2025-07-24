const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const requestedId = req.params.id === "me" ? req.user.id : req.params.id;

    console.log("Fetching profile for ID:", requestedId);

    const user = await User.findById(requestedId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// PUT /api/profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update profile' });
  }
};

// GET /api/profile/role/entrepreneurs
exports.getEntrepreneurs = async (req, res) => {
  try {
    const users = await User.find({ role: 'Entrepreneur' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entrepreneurs' });
  }
};

// GET /api/profile/role/investors
exports.getInvestors = async (req, res) => {
  try {
    const users = await User.find({ role: 'Investor' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investors' });
  }
};
