const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.send('Passwords do not match');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.send('Error registering user');
    }
});


router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send('Invalid credentials');
        }

    
        res.cookie('userId', user._id.toString(), { httpOnly: true });
        res.redirect('/blogs');
    } catch (err) {
        res.send('Login error');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('userId');
    res.redirect('/login');
});

module.exports = router;