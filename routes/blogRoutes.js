const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');


const dummyBlogs = [
    {
        title: "Introduction to Node.js",
        description: "Node.js is a JavaScript runtime environment used for backend development.",
        author: "Admin"
    },
    {
        title: "Introduction to MongoDB",
        description: "MongoDB is a NoSQL database used to store application data.",
        author: "Admin"
    }
];

router.get('/blogs', checkAuth, (req, res) => {
    res.render('blogs', { blogs: dummyBlogs, user: req.user });
});

module.exports = router;