const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number }, // المدة بالساعات
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }], 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
  });

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
