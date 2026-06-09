const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../middleware/auth');

router.get('/profile', verifyAccessToken, (req, res) => {
    res.json({ userId: req.user.id });
});

module.exports = router;