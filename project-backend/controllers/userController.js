import User  from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get user details
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    console.log('User fetched:', user);
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};


// Update user (only password allowed)
export const updateUser = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required for update' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user account
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
