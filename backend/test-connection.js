const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: false,
}).then(() => {
  console.log('MongoDB connection successful!');
  mongoose.connection.close();
}).catch((error) => {
  console.error('MongoDB connection failed:', error);
});