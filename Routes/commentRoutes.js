const express = require('express');
const router = express.Router();
const { addComment, getCommentsByVideo } = require('../Controllers/CommentController');
const { verifyToken } = require('../services/AuthService');


router.post('/add', verifyToken, addComment);


router.get('/:videoId', getCommentsByVideo);

module.exports = router;
