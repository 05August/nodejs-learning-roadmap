const mongoose = require('mongoose');
const config = require('../config/config');

const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message);
    statusCode = 400;
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

  // Log error details
  console.error(`Error ${statusCode}: ${message}`);
  if (config.env === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      status: statusCode,
      ...(config.env === 'development' && { stack: err.stack })
    }
  });
};

module.exports = {
  notFound,
  errorHandler
}; 