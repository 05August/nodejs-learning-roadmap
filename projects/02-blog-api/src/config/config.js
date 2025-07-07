// src/config/config.js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  
  // Database
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/blog-api',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // File Upload
  uploadMaxSize: parseInt(process.env.UPLOAD_MAX_SIZE) || 5 * 1024 * 1024, // 5MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  
  // Pagination
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE) || 100
};

module.exports = config; 