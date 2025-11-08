// Simple test script for Cloud Clipboard API
// Run with: node test-api.js

const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://localhost:5000';

// Test user credentials
const testUser = {
  email: 'test@example.com',
  password: 'password123'
};

// Test clip data
const testClip = {
  type: 'Text',
  content: 'This is a test clip for Cloud Clipboard',
  expiryMinutes: 5
};

let authToken = '';
let clipCode = '';

// Function to test user signup
async function testSignup() {
  try {
    console.log('Testing user signup...');
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, testUser);
    console.log('Signup successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message);
    return null;
  }
}

// Function to test user signin
async function testSignin() {
  try {
    console.log('Testing user signin...');
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, testUser);
    console.log('Signin successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Signin failed:', error.response?.data || error.message);
    return null;
  }
}

// Function to test clip creation
async function testCreateClip(token) {
  try {
    console.log('Testing clip creation...');
    const response = await axios.post(`${BASE_URL}/api/clip/add`, testClip, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Clip creation successful:', response.data);
    return response.data.code;
  } catch (error) {
    console.error('Clip creation failed:', error.response?.data || error.message);
    return null;
  }
}

// Function to test clip retrieval
async function testGetClip(code) {
  try {
    console.log('Testing clip retrieval...');
    const response = await axios.get(`${BASE_URL}/api/clip/${code}`);
    console.log('Clip retrieval successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Clip retrieval failed:', error.response?.data || error.message);
    return null;
  }
}

// Main test function
async function runTests() {
  console.log('Starting Cloud Clipboard API tests...\n');
  
  // Test 1: User signup
  authToken = await testSignup();
  if (!authToken) {
    // If signup failed, try signin
    authToken = await testSignin();
  }
  
  if (!authToken) {
    console.log('Authentication failed. Exiting tests.');
    return;
  }
  
  // Test 2: Create a clip
  clipCode = await testCreateClip(authToken);
  if (!clipCode) {
    console.log('Clip creation failed. Exiting tests.');
    return;
  }
  
  // Test 3: Retrieve the clip
  await testGetClip(clipCode);
  
  console.log('\nAPI tests completed.');
}

// Run the tests
runTests();