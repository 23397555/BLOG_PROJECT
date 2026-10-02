const User = require('../models/User');

const checkAuth = async (req, res, next) => {
    const userId = req.cookies.userId;
    if (!userId) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    } catch (err) {
        res.redirect('/login');
    }
};

module.exports = { checkAuth };