const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    console.log("Received register request:", req.body);
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


  

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return correct field (username, not name)
    res.json({ 
      token, 
      user: { id: user._id, name: user.username, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ msg: err.message }); // use msg instead of error
  }
};
