const fetch = require('node-fetch');

require("dotenv").config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const AuthRoute = require('./routes/auth');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const User = require('./models/User');
const {Course, Page} = require('./models/Course');

/* Config */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/assets', express.static('public/assets'));

// Session middleware configuration
app.use(session({
secret: process.env.JWT_SECRET, // Use a strong secret
resave: false,
saveUninitialized: true,
cookie: { secure: false } // Set to true in production with HTTPS
}));

// Passport.js middleware setup
app.use(passport.initialize());
app.use(passport.session());

// Serialize user into session
passport.serializeUser((user, done) => {
done(null, user.id);
});

// Deserialize user from session
// passport.deserializeUser((id, done) => {
// User.findById(id, (err, user) => {
//     done(err, user);
// });
// });
passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id); // Await the promise
      done(null, user);
  } catch (err) {
      done(err);
  }
});

/* Google OAuth Config */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        // If the user exists, return the existing user
        return cb(null, existingUser);
      } else {
        // If the user doesn't exist, create a new one
        const name = profile.displayName.split(" ");
        
        const newUser = new User({
          firstName: name[0],
          lastName: name[1],
          email: profile.emails[0].value,
          role: 'student',
          password: uuidv4(), // random string as password
          isActive: true,
          googleId: profile.id,
          profilePicture: profile.photos[0].value,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return cb(null, savedUser);
      }
    } catch (err) {
      console.error("Error during user authentication:", err);
      return cb(err);
    }
  }
));

/* Github OAuth Config */

// GitHub Strategy setup
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  // async function(accessToken, refreshToken, profile, done) {
  //   try {
  //     // Check if the user already exists in the database
  //     const existingUser = await User.findOne({ email: profile.emails[0].value });

  //     if (existingUser) {
  //       // If the user already exists, pass the existing user to the callback
  //       return done(null, existingUser);
  //     } else {
  //       // If the user doesn't exist, create a new user
  //       const name = profile.displayName.split(" "); // Assuming the full name is returned

  //       const newUser = new User({
  //         firstName: name[0] || '',  // Use empty string if firstName is undefined
  //         lastName: name[1] || '',   // Use empty string if lastName is undefined
  //         email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
  //         role: 'student',            // Assigning role as student
  //         githubId: profile.id        // Store the GitHub ID
  //       });

  //       // Save the new user to the database
  //       const savedUser = await newUser.save();
  //       return done(null, savedUser);
  //     }
  //   } catch (err) {
  //     console.error('Error during GitHub authentication:', err);
  //     return done(err);
  //   }
  // }
  async function(accessToken, refreshToken, profile, done) {
    try {
      let email;

      // Check if an email is directly provided in the profile
      if (profile.emails && profile.emails.length > 0) {
        email = profile.emails[0].value;
      } else {
        // Fetch email from GitHub API as a fallback
        const response = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        const emails = await response.json();
        // Find the primary verified email
        const primaryEmail = emails.find(e => e.primary && e.verified);
        email = primaryEmail ? primaryEmail.email : null;
      }

      if (!email) {
        return done(new Error("Email not provided by GitHub"));
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        const name = profile.displayName ? profile.displayName.split(" ") : ["", ""];
        const newUser = new User({

          firstName: name[0] || '',
          lastName: name[1] || '',
          email,
          role: 'student',
          githubId: profile.id,
          isActive : true

        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
    } catch (err) {
      console.error('Error during GitHub authentication:', err);
      return done(err);
    }
  }

));


/* File Storage */
const s3 = new S3Client({
    endpoint: "https://edulib-files.nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: "DO00Y7CRZEXAV7MNX8Y2",
        secretAccessKey: "Vbv46nAsL3gh/S2z2F9en++KY7V+OFramzTC4AXf0Yw",
    },
    forcePathStyle: true,
});

// upload files to s3 bucket
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "edulib-files",
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const uniqueName = uuidv4() + '-' + file.originalname;
            console.log("Unique name : " + uniqueName);
            cb(null, uniqueName);
        }
    }),
    limits: { fileSize: 1000 * 1024 * 1024 }, // Limit file size to 1GB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only jpeg, png, pdf and mp4 are allowed!'), false);
        }
    }
});

/* ROUTES WITH FILE UPLOAD */
const fileUploadMiddleware = upload.fields([{ name: 'courseVideo', maxCount: 1 }, { name: 'coursePDFs', maxCount: 8 }]);

// auth middleware needed here
app.post('/api/page/:courseId', fileUploadMiddleware, async (req, res) => {
  try {
      const { courseId } = req.params;

      const course = await Course.findById(courseId);

      if (!course) {
        throw 'Course not found!';
      } else {
        console.log("file upload request received");

        // Initialize pdf_paths as an empty array
        let pdf_paths = [];

        // Access the uploaded video 
        if (req.files.courseVideo) {
            await setTimeout(() => console.log("Received a video"), 2000);
            const videoFile = req.files.courseVideo[0];
            console.log("Video file path : " + videoFile.path);
        }

        if (req.files.coursePDFs) {
            await setTimeout(() => console.log("Received PDF documents"), 2000);
            const pdf_files = req.files.coursePDFs;
            pdf_paths = pdf_files.map((file) => file.location);
            console.log("PDF files path : " + pdf_paths);
        }

        const { title, textContent, youtubeUrl } = req.body;

        const page = new Page({ title, textContent, pdfPaths: pdf_paths, youtubeUrl });

        course.pages.push(page);

        await course.save();

        res.status(200).json({
          status: 'ok',
          message: 'Page added successfully',
        });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || err });
  }
});

app.post('/api/course', async (req, res) => {
  try {
    console.log(req.body);
    const course = new Course(req.body);
    await course.save();
    res.status(200).json({
      status: 'ok',
      message: 'Course created successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err,
    })
  }
});

/* upload profile image route for student */
/* upload profile image route for contributor */
/* upload profile image route for evaluator */
/* upload course thumbnail image route for contributor */

/* Google Sign In Route */

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/failure' }), function(req, res) {
    // Successful authentication, redirect to student dashboard.
    res.redirect(`http://localhost:3000/student`);
});

app.get('/auth/google/failure', (req, res) => {
    // Redirect to the React login page
    res.redirect('http://localhost:3000/login');
});

/* Routes for GitHub authentication */
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));
  
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect to the student route
      res.redirect('http://localhost:3000/student'); // Redirect to the desired route after login
    });

/* API ROUTES */
app.use('/api/auth', AuthRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error(`Error: ${err}`);
})