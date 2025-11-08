// Script to initialize database indexes
// Run with: node scripts/init-db.js

const mongoose = require('mongoose');
const connectDB = require('../config/db');
require('dotenv').config();

// Models
const Clip = require('../models/Clip');
const User = require('../models/User');

const initDB = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('Creating database indexes...');
    
    // Create indexes for User model
    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log('User email index created');
    
    // Create indexes for Clip model
    await Clip.collection.createIndex({ code: 1 }, { unique: true });
    console.log('Clip code index created');
    
    await Clip.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    console.log('Clip TTL index created');
    
    console.log('All indexes created successfully!');
    
    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDB();