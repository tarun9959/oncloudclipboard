const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  viewerEmail: {
    type: String,
    required: false
  },
  accessedAt: {
    type: Date,
    default: Date.now
  }
});

const clipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Text', 'Link', 'Code']
  },
  content: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '0' } // TTL index for auto-deletion
  },
  accessLogs: [accessLogSchema]
}, {
  timestamps: true
});

// Create TTL index for automatic deletion
clipSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Clip', clipSchema);