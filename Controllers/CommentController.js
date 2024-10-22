const Comment = require('../models/Comment');
const Video = require('../models/Video');

exports.addComment = async (req, res) => {
  try {
    const { content, videoId } = req.body;

  
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }


    const comment = new Comment({
      content,
      video: videoId,
      createdBy: req.userId
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // استرجاع جميع التعليقات المرتبطة بالفيديو
    const comments = await Comment.find({ video: videoId }).populate('createdBy', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
