// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Investor", "Entrepreneur"],
    required: true,
  },

  // Shared
  bio: { type: String }, // Short bio for both roles

  startup: { type: String }, // Optional
  pitch: { type: String }, // Optional
  pitchDeck: { type: String }, // Link to full pitch deck (PDF)
  fundingNeed: { type: String }, // Funding amount or description

  investmentInterests: [{ type: String }], // e.g., ['Tech', 'Healthcare']
  portfolioCompanies: [{ type: String }], // List of startups they've invested in

  avatar: {
    type: String,
    default: "", // or provide a default image URL
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
