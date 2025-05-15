import express from 'express';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

// Admin-only route
router.get('/admin', auth, checkRole('admin'), (req, res) => {
  res.json({
    msg: 'Welcome, admin!',
    user: req.user,
  });
});

router.get('/user', auth, checkRole('user'), (req, res) => {
  res.json({
    msg: 'Welcome User!',
    user: req.user,
  });
});

export default router;
