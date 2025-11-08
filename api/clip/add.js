const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// MongoDB connection helper
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = connection;
  return connection;
}

// Clip Schema
const ClipSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Text', 'Link', 'Code'], required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  accessLogs: [{
    viewerEmail: String,
    accessedAt: { type: Date, default: Date.now }
  }]
});

const Clip = mongoose.models.Clip || mongoose.model('Clip', ClipSchema);

// Generate random code
function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { type, content, expiryMinutes } = req.body;

    // Generate unique code
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = generateCode();
      const existing = await Clip.findOne({ code });
      if (!existing) isUnique = true;
    }

    // Calculate expiry
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Create clip
    const clip = new Clip({
      code,
      type,
      content,
      userId: decoded.userId,
      expiresAt
    });

    await clip.save();

    res.status(201).json({
      code: clip.code,
      type: clip.type,
      expiresAt: clip.expiresAt,
      createdAt: clip.createdAt
    });

  } catch (error) {
    console.error('Add clip error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
