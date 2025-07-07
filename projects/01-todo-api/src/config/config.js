// src/config/config.js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dataFile: process.env.DATA_FILE || './src/data/todos.json',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

module.exports = config; 