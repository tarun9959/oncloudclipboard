const dns = require('dns').promises;

// MongoDB Atlas servers from your connection string
const servers = [
  'ac-mktuzip-shard-00-00.ozsbizd.mongodb.net',
  'ac-mktuzip-shard-00-01.ozsbizd.mongodb.net',
  'ac-mktuzip-shard-00-02.ozsbizd.mongodb.net'
];

async function testConnectivity() {
  console.log('Testing connectivity to MongoDB Atlas servers...\n');
  
  for (const server of servers) {
    try {
      console.log(`Resolving ${server}...`);
      const addresses = await dns.resolve(server);
      console.log(`✓ ${server} resolved to: ${addresses.join(', ')}\n`);
    } catch (error) {
      console.log(`✗ Failed to resolve ${server}: ${error.message}\n`);
    }
  }
  
  console.log('Network test completed.');
}

testConnectivity();