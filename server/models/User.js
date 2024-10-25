const mongoose = require('mongoose');

const roleEnum = ['admin', 'evaluator', 'contributor', 'student'];

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: false,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
        validator: function (value) {
            // Regular expression to validate email format
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: 'Please provide a valid email address',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    role: {
        type: String,
        required: true,
        enum: roleEnum,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    githubId: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;