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
const passport = require('passport');
const User = require('./models/User');

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
passport.deserializeUser((id, done) => {
User.findById(id, (err, user) => {
    done(err, user);
});
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


/* File Storage */
const s3 = new S3Client({
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: process.env.DO_SPACES_REGION,
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
    forcePathStyle: true,
});

// upload files to s3 bucket
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.DO_SPACES_BUCKET,
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
app.post('/api/course', fileUploadMiddleware, async (req, res) => {
    try {
        console.log("file upload request recieved")
        // Access the uploaded video 
        if (req.files.courseVideo) {
            await setTimeout(() => console.log("Recieved a video"), 2000);
            const videoFile = req.files.courseVideo[0];
            console.log("Video file path : " + videoFile);
        }
        if (req.files.coursePDFs) {
            await setTimeout(() => console.log("Recieved PDF documents"), 2000);
            const pdf_files = req.files.coursePDFs;
            const pdf_paths = pdf_files.map((file) => file.path);
            console.log("PDF files path : " + pdf_paths);
        }
        res.status(200).json({
            message: 'upload success! course content successfully uploaded to s3 bucket',
        });
    } catch (err) {
        console.error(err);
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