const Joi = require('joi');
const User = require('../models/User');

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  bio: Joi.string().max(500).allow('')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

class AuthController {
  // POST /api/v1/auth/register
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        return next(validationError);
      }

      const { name, email, password, bio } = value;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('User already exists with this email');
        error.statusCode = 400;
        return next(error);
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password,
        bio
      });

      // Generate token
      const token = user.generateToken();

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: user.toJSON(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/auth/login
  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        return next(validationError);
      }

      const { email, password } = value;

      // Find user and include password
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        return next(error);
      }

      // Check if user is active
      if (!user.isActive) {
        const error = new Error('Account is deactivated');
        error.statusCode = 401;
        return next(error);
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        return next(error);
      }

      // Update last login
      await user.updateLastLogin();

      // Generate token
      const token = user.generateToken();

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: user.toJSON(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/v1/auth/me
  async getMe(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      
      res.json({
        success: true,
        data: {
          user: user.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/auth/update-profile
  async updateProfile(req, res, next) {
    try {
      const updateSchema = Joi.object({
        name: Joi.string().min(2).max(50),
        bio: Joi.string().max(500).allow(''),
        avatar: Joi.string().uri().allow('')
      });

      const { error, value } = updateSchema.validate(req.body);
      if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        return next(validationError);
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        value,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: user.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/v1/auth/change-password
  async changePassword(req, res, next) {
    try {
      const passwordSchema = Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(6).required()
      });

      const { error, value } = passwordSchema.validate(req.body);
      if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        return next(validationError);
      }

      const { currentPassword, newPassword } = value;

      // Get user with password
      const user = await User.findById(req.user._id).select('+password');

      // Check current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        const error = new Error('Current password is incorrect');
        error.statusCode = 400;
        return next(error);
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController(); 