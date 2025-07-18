const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const User = require('../models/User');

// POST /api/request – send request
router.post('/', async (req, res) => {
  const { investorId, entrepreneurId } = req.body;
    console.log("Investor:", investorId, "Entrepreneur:", entrepreneurId);
if (!investorId || !entrepreneurId) {
      return res.status(400).json({ error: 'InvestorId and EntrepreneurId are required' });
    }
  try {
    // prevent duplicate requests
    const exists = await Request.findOne({ investorId, entrepreneurId });
    if (exists) return res.status(400).json({ message: 'Request already exists' });

    const request = new Request({ investorId, entrepreneurId });
    await request.save();

    res.status(201).json(request);
  } catch (err) {
    console.error('Error sending request:', err);
    res.status(500).json({ message: 'Server error sending request' });
  }
});

// GET /api/requests – fetch logged-in user's requests
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  try {
    const requests = await Request.find({
      $or: [{ investorId: userId }, { entrepreneurId: userId }]
    })
      .populate('investorId', 'name')
      .populate('entrepreneurId', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ message: 'Server error fetching requests' });
  }
});

// PATCH /api/request/:id – update request status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

// GET /api/requests/entrepreneur/:id
router.get('/entrepreneur/:id', async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    const requests = await Request.find({ entrepreneurId })
      .populate('investorId', 'name bio')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error('Error fetching entrepreneur requests:', err);
    res.status(500).json({ message: 'Server error fetching entrepreneur requests' });
  }
});


module.exports = router;
