// /routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
  res.json({ msg: `Bienvenido, tu ID es ${req.user.id}` });
});

module.exports = router;
