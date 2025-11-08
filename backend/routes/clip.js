const express = require('express');
const router = express.Router();
const Clip = require('../models/Clip');
const { protect } = require('../middleware/authMiddleware');

// Generate a random share code
const generateShareCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const codeLength = Math.floor(Math.random() * 3) + 6; // 6-8 characters
  
  for (let i = 0; i < codeLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

// @desc    Create a new clip
// @route   POST /api/clip/add
// @access  Private
router.post('/add', protect, async (req, res) => {
  const { type, content, expiryMinutes } = req.body;

  // Validate required fields
  if (!type || !content || !expiryMinutes) {
    return res.status(400).json({ message: 'Type, content, and expiry minutes are required' });
  }

  // Validate type
  if (!['Text', 'Link', 'Code'].includes(type)) {
    return res.status(400).json({ message: 'Invalid clip type' });
  }

  try {
    // Generate unique share code
    let shareCode;
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
      shareCode = generateShareCode();
      const existingClip = await Clip.findOne({ code: shareCode });
      if (!existingClip) {
        isUnique = true;
      }
      attempts++;
    }
    
    if (!isUnique) {
      return res.status(500).json({ message: 'Could not generate unique share code' });
    }

    // Calculate expiry date
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Create clip
    const clip = await Clip.create({
      type,
      content,
      code: shareCode,
      expiresAt,
      accessLogs: []
    });

    res.status(201).json({
      _id: clip._id,
      type: clip.type,
      content: clip.content,
      code: clip.code,
      expiresAt: clip.expiresAt,
      createdAt: clip.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Retrieve a clip using share code
// @route   GET /api/clip/:code
// @access  Public
router.get('/:code', async (req, res) => {
  try {
    const clip = await Clip.findOne({ code: req.params.code });
    
    if (!clip) {
      return res.status(404).json({ message: 'Clip not found' });
    }
    
    // Check if clip has expired
    if (clip.expiresAt < new Date()) {
      return res.status(404).json({ message: 'Clip has expired' });
    }
    
    // Log access
    const accessLog = {
      viewerEmail: req.user ? req.user.email : null,
      accessedAt: new Date()
    };
    
    clip.accessLogs.push(accessLog);
    await clip.save();
    
    res.json({
      _id: clip._id,
      type: clip.type,
      content: clip.content,
      code: clip.code,
      expiresAt: clip.expiresAt,
      accessLogs: clip.accessLogs,
      createdAt: clip.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get clip access logs
// @route   GET /api/clip/:id/logs
// @access  Private
router.get('/:id/logs', protect, async (req, res) => {
  try {
    const clip = await Clip.findById(req.params.id);
    
    if (!clip) {
      return res.status(404).json({ message: 'Clip not found' });
    }
    
    // Check if user owns this clip (optional - could be admin only)
    // For now, we'll allow access to logs if user is authenticated
    
    res.json({
      _id: clip._id,
      code: clip.code,
      accessLogs: clip.accessLogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;