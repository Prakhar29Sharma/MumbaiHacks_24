const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  textContent: {
    type: String,
    required: true,
  },
  pdfPaths: [{
    type: String,
  }],
  youtubeUrl: {
    type: String,
    validate: {
      validator: function (url) {
        // Basic URL validation for YouTube
        return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url);
      },
      message: 'Invalid YouTube URL',
    },
  },
});

// Define the Course Schema
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  pages: [PageSchema]  // Embedding the PageSchema as an array in CourseSchema
});

// Create the models
const Page = mongoose.model('Page', PageSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course, Page };
