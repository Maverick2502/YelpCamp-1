const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password); // Hashes password with salt and registers user with hashed password
        req.login(registeredUser, err => { // Login user after registering; used only after user sign up 
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds')
        })
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || 'campgrounds';
    delete req.session.returnTo;
    res.redirect('/campgrounds');
}

module.exports.logout = (req, res) => {
    req.logout(); // This is the only thing we need to logout; it removes the user's session
    req.flash('success', 'Logged Out!');
    res.redirect('/campgrounds');
}