import User from '../models/User.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({
      msg: 'User registered',
      data: { role: user.role }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// FORGOT PASSWORD


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Security: Always return same message regardless of user existence
    if (!user) {
      return res.status(200).json({
        message: 'If this email exists in our system, you will receive a reset link'
      });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

 await req.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Password Reset Request',
      html: `...your email template...`
    });

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to email'
    });

    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending reset email'
    });

    // Send email using SendGrid
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; background: #4CAF50; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 4px;
                    margin: 15px 0; font-weight: bold;">
             Reset Password
          </a>
          <p style="color: #666;">This link expires in 1 hour.</p>
          <p style="font-size: 12px; color: #999;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `
    };

    await req.app.get('transporter').sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to email'
    });

  }catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending reset email'
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Hash the token to compare with stored value
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Update password and clear token
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};