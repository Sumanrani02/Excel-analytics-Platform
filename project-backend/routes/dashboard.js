const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');


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

module.exports = router;

