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

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

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

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { code } = req.query;

    // Find clip
    const clip = await Clip.findOne({ code });

    if (!clip) {
      return res.status(404).json({ message: 'Clip not found' });
    }

    // Check if expired
    if (new Date() > clip.expiresAt) {
      await Clip.deleteOne({ code });
      return res.status(410).json({ message: 'Clip has expired' });
    }

    // Log access
    let viewerEmail = null;
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        viewerEmail = user?.email;
      } catch (err) {
        // Token invalid, continue as anonymous
      }
    }

    clip.accessLogs.push({ viewerEmail });
    await clip.save();

    res.status(200).json({
      code: clip.code,
      type: clip.type,
      content: clip.content,
      expiresAt: clip.expiresAt,
      createdAt: clip.createdAt,
      accessLogs: clip.accessLogs
    });

  } catch (error) {
    console.error('Get clip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
