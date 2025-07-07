const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      const error = new Error('Not authorized to access this route');
      error.statusCode = 401;
      return next(error);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);
      
      // Get user from database
      const user = await User.findById(decoded.id);
      
      if (!user) {
        const error = new Error('No user found with this token');
        error.statusCode = 401;
        return next(error);
      }

      if (!user.isActive) {
        const error = new Error('User account is deactivated');
        error.statusCode = 401;
        return next(error);
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      error.statusCode = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(`User role ${req.user.role} is not authorized to access this route`);
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};

// Check if user is post author or admin
const checkPostOwnership = async (req, res, next) => {
  try {
    const Post = require('../models/Post');
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      return next(error);
    }

    // Allow if user is admin or post author
    if (req.user.role === 'admin' || post.author.toString() === req.user._id.toString()) {
      req.post = post;
      return next();
    }

    const error = new Error('Not authorized to access this post');
    error.statusCode = 403;
    return next(error);
  } catch (error) {
    next(error);
  }
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.id);
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Ignore token errors for optional auth
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  protect,
  authorize,
  checkPostOwnership,
  optionalAuth
}; 