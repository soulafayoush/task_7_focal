const Course = require('../models/Course');

const Comment = require('../models/Comment'); 
const Video = require('../models/Video'); 

exports.addCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const course = new Course({ title, description, duration, createdBy: req.userId });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.userId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, duration } = req.body;
  
      console.log('User ID:', req.userId); 
      

      const course = await Course.findOne({ _id: id, createdBy: req.userId });
      console.log('Course:', course); 
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found or you are not authorized to update this course.' });
      }
  
 
      course.title = title || course.title;
      course.description = description || course.description;
      course.duration = duration || course.duration;
      await course.save();
  
      res.status(200).json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  exports.deleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
  
      const course = await Course.findOne({ _id: id, createdBy: req.userId });
      if (!course) {
        return res.status(404).json({ error: 'Course not found or you are not authorized to delete this course.' });
      }
  
      // حذف جميع الفيديوهات المتعلقة بالكورس
      await Video.deleteMany({ course: id });
  
      // حذف جميع التعليقات المتعلقة بتلك الفيديوهات
      await Comment.deleteMany({ video: { $in: await Video.find({ course: id }).select('_id') } });
  
      // حذف الكورس نفسه
      await Course.deleteOne({ _id: id });
  
  
      res.status(200).json({ message: 'Course and its related videos and comments have been successfully deleted.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  