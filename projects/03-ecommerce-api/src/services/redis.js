const redis = require('redis');
const config = require('../config/config');

const client = redis.createClient({
  url: config.redisUrl
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('Redis connected');
});

module.exports = client; 