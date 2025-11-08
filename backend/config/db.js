const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`✗ MongoDB connection error: ${error.message}`);
    
    // Don't exit, let the app run but log the error
    console.error('The app will continue running, but database operations will fail.');
    console.error('Please check your MongoDB Atlas configuration:');
    console.error('1. Ensure your IP is whitelisted (0.0.0.0/0 for testing)');
    console.error('2. Verify username and password are correct');
  }
};

module.exports = connectDB;