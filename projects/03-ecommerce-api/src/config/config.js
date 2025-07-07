// src/config/config.js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  // Database
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce-api',
  
  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // Stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_...',
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_...',
  
  // Email
  emailHost: process.env.EMAIL_HOST || 'smtp.gmail.com',
  emailPort: process.env.EMAIL_PORT || 587,
  emailUser: process.env.EMAIL_USER || 'your-email@gmail.com',
  emailPassword: process.env.EMAIL_PASSWORD || 'your-app-password',
  emailFrom: process.env.EMAIL_FROM || 'E-commerce API <noreply@example.com>',
  
  // File Upload
  uploadMaxSize: parseInt(process.env.UPLOAD_MAX_SIZE) || 5 * 1024 * 1024, // 5MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  
  // Pagination
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE) || 100,
  
  // Cache
  cacheTimeout: parseInt(process.env.CACHE_TIMEOUT) || 3600, // 1 hour
  
  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};

module.exports = config; 