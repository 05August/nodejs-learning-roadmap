const nodemailer = require('nodemailer');
const config = require('../config/config');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: config.emailHost,
  port: config.emailPort,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.emailUser,
    pass: config.emailPassword
  }
});

class EmailService {
  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: config.emailFrom,
      to: email,
      subject: 'Welcome to E-commerce API!',
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for joining our e-commerce platform.</p>
        <p>Start shopping now and enjoy our amazing deals!</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }

  async sendOrderConfirmation(email, orderData) {
    const mailOptions = {
      from: config.emailFrom,
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmed!</h1>
        <p>Your order #${orderData.orderNumber} has been confirmed.</p>
        <p>Total: $${orderData.totalAmount}</p>
        <p>We'll send you an update when it ships.</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
    }
  }

  async sendPasswordReset(email, resetToken) {
    const resetUrl = `${config.frontendUrl}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: config.emailFrom,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}

module.exports = new EmailService(); 