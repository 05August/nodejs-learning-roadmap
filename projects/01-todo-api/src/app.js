// src/app.js - Main application file
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const todoRoutes = require('./routes/todoRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const config = require('./config/config');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/v1/todos', todoRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = config.port;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Todo API server running on port ${PORT}`);
    console.log(`📊 Environment: ${config.env}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
  });
}

module.exports = app; 