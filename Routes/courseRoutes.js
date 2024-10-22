const express = require('express');
const router = express.Router();
const { addCourse, getCourses,updateCourse,deleteCourse } = require('../Controllers/CourseController');
const { verifyToken } = require('../services/AuthService');

router.post('/add', verifyToken, addCourse);
router.get('/', verifyToken, getCourses);
router.put('/:id', verifyToken, updateCourse);
router.delete('/:id', verifyToken, deleteCourse);
module.exports = router;
