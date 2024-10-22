const Video = require('../models/Video');

exports.addVideo = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    const video = new Video({ title, description, course: courseId });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
