import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboard.js';
import fileRoutes from './routes/fileRoutes.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/User.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on port ${process.env.PORT || 5000}`)
  );
})
.catch(err => console.log("MongoDB connection error:", err));

// Create and verify transporter immediately
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('Transporter error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Make transporter available to all routes
app.use((req, res, next) => {
  req.transporter = transporter;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/user', userRoutes)
