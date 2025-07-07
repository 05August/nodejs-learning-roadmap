// src/app.js - Main application file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Routes imports
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Middleware imports
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const config = require('./config/config');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
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

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Blog API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      posts: '/api/v1/posts',
      users: '/api/v1/users',
      categories: '/api/v1/categories'
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
    console.log(`🚀 Blog API server running on port ${PORT}`);
    console.log(`📊 Environment: ${config.env}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/`);
  });
}

module.exports = app; 