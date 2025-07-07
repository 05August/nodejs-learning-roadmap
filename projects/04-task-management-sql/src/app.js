const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const db = require('./config/database');
const errorMiddleware = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message) } }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: db.sequelize.authenticate() ? 'Connected' : 'Disconnected'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Task Management API',
    version: '1.0.0',
    description: 'RESTful API for Task Management with PostgreSQL',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      projects: '/api/projects',
      tasks: '/api/tasks',
      users: '/api/users'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Database connection and sync
const startServer = async () => {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Sync database (only in development)
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: true });
      logger.info('Database synced successfully.');
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info(`Database: ${process.env.DB_NAME}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await db.sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await db.sequelize.close();
  process.exit(0);
});

// Start server
if (require.main === module) {
  startServer();
}

module.exports = app; 