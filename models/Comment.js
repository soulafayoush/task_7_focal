const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
  });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
