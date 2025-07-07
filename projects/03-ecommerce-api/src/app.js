// src/app.js - Main application file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Services
const redisClient = require('./services/redis');
const emailService = require('./services/email');

// Routes imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware imports
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const config = require('./config/config');

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🔗 MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Redis connection
redisClient.connect()
  .then(() => console.log('🔗 Redis connected successfully'))
  .catch(err => console.error('❌ Redis connection failed:', err));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    redis: redisClient.isOpen ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/admin', adminRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to E-commerce API',
    version: '1.0.0',
    features: [
      'Authentication & Authorization',
      'Product Management',
      'Shopping Cart',
      'Order Processing',
      'Payment Integration (Stripe)',
      'Email Notifications',
      'Redis Caching',
      'Admin Dashboard'
    ],
    endpoints: {
      auth: '/api/v1/auth',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
      cart: '/api/v1/cart',
      payments: '/api/v1/payments',
      admin: '/api/v1/admin'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = config.port;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 E-commerce API server running on port ${PORT}`);
    console.log(`📊 Environment: ${config.env}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/`);
  });
}

module.exports = app; 