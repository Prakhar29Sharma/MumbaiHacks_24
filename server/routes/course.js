const { Course } = require('../models/Course');
const express = require('express');
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

const router = express.Router();

router.get('/', getAllCourses);

module.exports = router;