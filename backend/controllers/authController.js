const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 // TEMP debug

// Register User
exports.register = async (req, res) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   console.log("JWT_SECRET in authControl:", JWT_SECRET);
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET in authController:", JWT_SECRET);
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
