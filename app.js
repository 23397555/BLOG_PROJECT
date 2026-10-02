const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.redirect('/login');
});


app.use('/', authRoutes);
app.use('/', blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});