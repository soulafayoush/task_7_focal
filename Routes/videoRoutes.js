const express = require('express');
const router = express.Router();
const { addVideo } = require('../Controllers/VideoController');
const { verifyToken } = require('../services/AuthService');

router.post('/add', verifyToken, addVideo);

module.exports = router;
