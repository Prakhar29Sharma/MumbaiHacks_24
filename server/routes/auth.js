const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Add mail service

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password, rememberMe, role } = req.body;
    // fetch user from database and verify if the user exists or not
    const user = await User.findOne({ email: email, role: role });
    if (user) {
        const token = jwt.sign({
            email,
            password,
            role,
            rememberMe,
        }, process.env.JWT_SECRET, { expiresIn: rememberMe === 'on' ? '48h' : '1h' });

        if (user.password === password) {
            res.status(200).json({
                message: 'Login success',
                user: {
                    email: user.email,
                    role: user.role,
                },
                jwt_token: token,
                expiration: rememberMe === 'on' ? 48 : 1,
            });
        } else {
            res.status(400).json({
                error: 'Invalid credentials',
            });
        }
    } else {
        res.status(400).json({
            error: 'Invalid credentials',
        });
    }
});

router.post('/student/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    // check if user already exists in database
    role = 'student'

    const user = await User.exists({ email: email });

    if (user) {
        res.status(400).json({
            error: 'user with this email already exists',
        });
    } else {
        // create a new student user
        isActive = true;
        const user = new User({ firstName, lastName, email, password, role, isActive });
        await user.save()
        .then(async () => {
            // send a welcome mail to the student
        });
        res.status(200).json({
            message: 'Registration success',
        })
    }
});

module.exports = router;